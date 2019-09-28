using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CoreMVC01.Models;
using CoreMVC01.ViewModels.Purchases;

namespace CoreMVC01.Controllers
{
    public class PurchasesController : Controller
    {
        private readonly CORETONMDFContext _context;
        

        public PurchasesController(CORETONMDFContext context)
        {
            _context = context;
        }
        
        // GET: Purchases
        public ActionResult Index([Bind("Sid")] Purchase purchase,string Spname)
        {
            var purchasedata = from s in _context.Suppliers
                               join p in _context.Purchase
                               on s.Sid equals p.Sid
                               orderby s.Sid
                               select new { s, p };

            List<SelectListItem> supplist = new List<SelectListItem>();
            foreach(var item in purchasedata.Select(e => e.s).Distinct().OrderBy(e => e.Sid))
            {
                supplist.Add(new SelectListItem { Text = item.Sname, Value = item.Sid });
            }

            if (string.IsNullOrEmpty(purchase.Sid) != true)
            {
                purchasedata = purchasedata.Where(e => e.p.Sid == purchase.Sid);
            }
            if(string.IsNullOrEmpty(Spname) != true)
            {
                purchasedata = purchasedata.Where(e => e.p.Spname.Contains(Spname));
            }

            PurchasesIndexViewModel PViewModel = new PurchasesIndexViewModel
            {
                Supplier = purchasedata.Select(e => e.s).Distinct(),
                Purchase = purchasedata.Select(e => e.p),
                SupplierList = supplist
            };           

            return View(PViewModel);
        }
        // GET: Purchases/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var purchase = await _context.Purchase
                .FirstOrDefaultAsync(m => m.Spid == id);
            if (purchase == null)
            {
                return NotFound();
            }

            return View(purchase);
        }

        // GET: Purchases/Create
        public IActionResult Create()
        {
            var suppdata = from e in _context.Suppliers.Distinct()
                           select e;

            var purchasedata = from a in _context.Purchase
                               select a;
            
            //Purchase purchasedata = new Purchase();
            List < SelectListItem > supplist = new List<SelectListItem>();
            foreach(var item in suppdata)
            {
                supplist.Add(new SelectListItem() { Text = item.Sname, Value = item.Sid });
            }
            /*
            ViewBag.supp = supplist;
            return View();
            */

           
            PurchasesIndexViewModel pViewModel = new PurchasesIndexViewModel();
            pViewModel.SupplierList = supplist;
            pViewModel.Purchase = purchasedata.Take(0);  //Create View所使用的Dropdownlistfor控制項名稱和此句有關,若只指定名稱而無此句,則會出現來源錯誤
                                                         //Take()若不為0,則在Create的View上會顥示Purchasedata所查詢出來的資料；Take(0)為固定查詢結果的最大筆數
            //pViewModel.SupperList = new SelectList(suppdata, "Sid", "Sname");

            return View(pViewModel);            

            

        }

        // POST: Purchases/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Spid,Sid,Spname,Specification,Spunit,Spprice")] Purchase purchase)
        //public ActionResult Create([Bind("Spid,Sid,Spname,Spunit")] Purchase purchase)
        {
            if (ModelState.IsValid)
            {                
                _context.Add(purchase);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));                
            }             
            return View(purchase);
        }

        // GET: Purchases/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var purchase = await _context.Purchase.FindAsync(id);
            if (purchase == null)
            {
                return NotFound();
            }
            return View(purchase);
        }

        // POST: Purchases/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Spid,Sid,Spname,Spunit")] Purchase purchase)
        {
            if (id != purchase.Spid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(purchase);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PurchaseExists(purchase.Spid))
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
            return View(purchase);
        }

        // GET: Purchases/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var purchase = await _context.Purchase
                .FirstOrDefaultAsync(m => m.Spid == id);
            if (purchase == null)
            {
                return NotFound();
            }

            return View(purchase);
        }

        // POST: Purchases/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var purchase = await _context.Purchase.FindAsync(id);
            _context.Purchase.Remove(purchase);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PurchaseExists(string id)
        {
            return _context.Purchase.Any(e => e.Spid == id);
        }
    }
}
