using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CoreMVC01.Models;
using CoreMVC01.ViewModels.Sells;
using Newtonsoft.Json;

namespace CoreMVC01.Controllers
{
    public class SellsController : Controller
    {
        private readonly CORETONMDFContext _context;

        public SellsController(CORETONMDFContext context)
        {
            _context = context;
        }

        // GET: Sells
        public ActionResult Index([Bind("Cid")]Sell sell, Products products, string Pname)
        {
            /*
            var selldata = from s in _context.Sell
                           join c in _context.Customers
                           on s.Cid equals c.Cid into gp1
                           from t in gp1.DefaultIfEmpty()
                           select new { s, t };
            */
            var selldata = from s in _context.Sell
                           join c in _context.Customers
                           on s.Cid equals c.Cid
                           join p in _context.Products
                           on s.Pid equals p.Pid into gp1
                           from t in gp1.DefaultIfEmpty()
                           orderby c.Cid, t.Pid
                           select new { c, t, s };

            if (string.IsNullOrEmpty(sell.Cid) != true)
            {
                selldata = selldata.Where(e => e.c.Cid == sell.Cid);
            }
            else
            {
                selldata = selldata.Where(e => e.c.Cid == "CustZ-000-01");  //預設第一次進入Index只會顯示"門市銷售"的銷售資料
                products.Pname = null;
            }
            if (string.IsNullOrEmpty(Pname) != true)
            {
                selldata = selldata.Where(e => e.t.Pname.Contains(Pname));
            }

            //顯示客戶名稱下拉式選單
            var sellcustomerdata = from s in _context.Sell
                                   join c in _context.Customers
                                   on s.Cid equals c.Cid into gp2
                                   from a in gp2.DefaultIfEmpty()
                                   select new { a.Cid, a.Cname };
            List<SelectListItem> customerli = new List<SelectListItem>();
            foreach (var item in sellcustomerdata.Distinct().OrderBy(e => e.Cid))
            {
                customerli.Add(new SelectListItem() { Text = item.Cname, Value = item.Cid });
            }

            /*
             SellIndexViewmodel sellvm = new SellIndexViewmodel();
             sellvm.Customers = selldata.Select(e => e.c).OrderBy(e => e.Cid).Distinct();
             sellvm.Products = selldata.Select(e => e.t).OrderBy(e => e.Pid).Distinct();
             sellvm.Sells = selldata.Select(e => e.s).OrderBy(e => e.Cid).OrderByDescending(e =>e.Pid);
             sellvm.CustomerList = customerli;
             */
            SellIndexViewmodel sellvm = new SellIndexViewmodel
            {
                Customers = selldata.Select(e => e.c).OrderBy(e => e.Cid).Distinct(),
                Products = selldata.Select(e => e.t).OrderBy(e => e.Pid).Distinct(),
                Sells = selldata.Select(e => e.s).OrderBy(e => e.Cid).ThenBy(e => e.Pid),
                CustomerList = customerli
            };
            return View(sellvm);
        }

        // GET: Sells/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sell = await _context.Sell
                .FirstOrDefaultAsync(m => m.Cid == id);
            if (sell == null)
            {
                return NotFound();
            }

            return View(sell);
        }
        /*
        // GET: Sells/Create
        public IActionResult Create()
        {
            SellIndexViewmodel sellviewmodel = new SellIndexViewmodel()
            {
                classForCompanies = _context.ClassForCompany.Where(e => e.ClassId.Contains("cust")),
                Customers = _context.Customers
            };

            

            return View(sellviewmodel);
        }
        */

        public IActionResult Create()
        {
            //customer part
            /*
            var CustomerData = _context.ClassForCompany.Where(x => x.ClassId.Contains("CUST")).ToList();
            var sub_CustomerData = _context.Customers.ToList();
            IList<SellNemuVM> result = new List<SellNemuVM>();
            foreach (var item in CustomerData)
            {
                var item_data = new SellNemuVM();
                item_data.ClassId = item.ClassId;
                item_data.ClassName = item.ClassName;
                item_data.Customers = sub_CustomerData.Where(x => x.ClassId == item.ClassId).ToList();
                result.Add(item_data);
            }*/


            //下拉選單-客戶(Customer part)
            var CustomerData = _context.ClassForCompany.Where(x => x.ClassId.Contains("CUST")).ToList();
            var sub_CustomerData = _context.Customers.ToList();
            IList<SellViewModel.Sellcustomer> Customer_result = new List<SellViewModel.Sellcustomer>();
            foreach (var item in CustomerData)
            {
                var item_customer = new SellViewModel.Sellcustomer
                {
                    ClassId = item.ClassId,
                    ClassName = item.ClassName,
                    Customers = sub_CustomerData.Where(x => x.ClassId == item.ClassId).ToList()
                };
                Customer_result.Add(item_customer);
            }
            ViewBag.Customerdata = JsonConvert.SerializeObject(Customer_result);

            //下拉選單-產品(Prodcut part)
            var ProductData = _context.ClassForProduct.ToList();
            var sub_ProductData = _context.Products.ToList();
            IList<SellViewModel.Sellproduct> Product_result = new List<SellViewModel.Sellproduct>();
            foreach (var item in ProductData)
            {
                if (sub_ProductData.Where(e => e.ClassId == item.ClassId).Count() > 0) //判斷產品類別底下是否有資料
                {
                    var item_product = new SellViewModel.Sellproduct
                    {
                        ClassId = item.ClassId,
                        ClassName = item.ClassName,
                        Products = sub_ProductData.Where(e => e.ClassId == item.ClassId).ToList()
                    };
                    Product_result.Add(item_product);
                }
            }
            ViewBag.Productdata = JsonConvert.SerializeObject(Product_result);

            return View();
        }

        [HttpPost]
        public ActionResult SaveCreate(string data)
        {
            SellSaveModel model = JsonConvert.DeserializeObject<SellSaveModel>(data);
            //Console.WriteLine(data);
            var result = new { result = "ok", errorMessage = "", data = data, model = model };
            return Json(result);
        }

        // GET: Sells/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sell = await _context.Sell.FindAsync(id);
            if (sell == null)
            {
                return NotFound();
            }
            return View(sell);
        }

        // POST: Sells/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Cid,Pid,SellPrice")] Sell sell)
        {
            if (id != sell.Cid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sell);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SellExists(sell.Cid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(sell);
        }

        // GET: Sells/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sell = await _context.Sell
                .FirstOrDefaultAsync(m => m.Cid == id);
            if (sell == null)
            {
                return NotFound();
            }

            return View(sell);
        }

        // POST: Sells/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var sell = await _context.Sell.FindAsync(id);
            _context.Sell.Remove(sell);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SellExists(string id)
        {
            return _context.Sell.Any(e => e.Cid == id);
        }
    }
}
