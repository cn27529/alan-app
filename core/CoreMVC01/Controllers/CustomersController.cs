using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CoreMVC01.Models;

namespace CoreMVC01.Controllers
{
    public class CustomersController : Controller
    {
        private readonly CORETONMDFContext _contextCustomer;

        public CustomersController(CORETONMDFContext context)
        {
            _contextCustomer = context;
        }

        // GET: Customers
        public async Task<IActionResult> Index(string searchCname)
        {
            var sqlstrBase = from m in _contextCustomer.Customers
                         select m;

            if (!String.IsNullOrEmpty(searchCname))
            {
                searchCname = searchCname.Trim();
                sqlstrBase = sqlstrBase.Where(s => s.Cname.Contains(searchCname));
            }

            return View(await sqlstrBase.OrderBy(e => e.Cid).ToListAsync());
        }

        // GET: Customers/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customers = await _contextCustomer.Customers
                .FirstOrDefaultAsync(m => m.Cid == id);
            if (customers == null)
            {
                return NotFound();
            }

            return View(customers);
        }

        // GET: Customers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Cid,Cname,Ctel,Cfax,Ccity")] Customers customers)
        {
            if (ModelState.IsValid)
            {
                _contextCustomer.Add(customers);
                await _contextCustomer.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(customers);
        }

        // GET: Customers/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customers = await _contextCustomer.Customers.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }
            return View(customers);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Cid,Cname,Ctel,Cfax,Ccity")] Customers customers)
        {
            if (id != customers.Cid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _contextCustomer.Update(customers);
                    await _contextCustomer.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomersExists(customers.Cid))
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
            return View(customers);
        }

        // GET: Customers/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customers = await _contextCustomer.Customers
                .FirstOrDefaultAsync(m => m.Cid == id);
            if (customers == null)
            {
                return NotFound();
            }

            return View(customers);
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var customers = await _contextCustomer.Customers.FindAsync(id);
            _contextCustomer.Customers.Remove(customers);
            await _contextCustomer.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CustomersExists(string id)
        {
            return _contextCustomer.Customers.Any(e => e.Cid == id);
        }
    }
}
