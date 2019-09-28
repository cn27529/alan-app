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
    public class SuppliersController : Controller
    {
        private readonly CORETONMDFContext _contextSupplier;

        public SuppliersController(CORETONMDFContext context)
        {
            _contextSupplier = context;
        }

        // GET: Suppliers
        public async Task<IActionResult> Index(string searchSname)
        {
            var sqlstrBase = from m in _contextSupplier.Suppliers
                             select m;
            if (!String.IsNullOrEmpty(searchSname))
            {
                searchSname = searchSname.Trim();
                sqlstrBase = sqlstrBase.Where(s => s.Sname.Contains(searchSname));
            }
            return View(await sqlstrBase.OrderBy(e => e.Sid).ToListAsync());
        }

        // GET: Suppliers/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var suppliers = await _contextSupplier.Suppliers
                .FirstOrDefaultAsync(m => m.Sid == id);
            if (suppliers == null)
            {
                return NotFound();
            }

            return View(suppliers);
        }

        // GET: Suppliers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Suppliers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Sid,Sname,Stel,Sfax,Scity")] Suppliers suppliers)
        {
            if (ModelState.IsValid)
            {
                _contextSupplier.Add(suppliers);
                await _contextSupplier.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(suppliers);
        }

        // GET: Suppliers/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var suppliers = await _contextSupplier.Suppliers.FindAsync(id);
            if (suppliers == null)
            {
                return NotFound();
            }
            return View(suppliers);
        }

        // POST: Suppliers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Sid,Sname,Stel,Sfax,Scity")] Suppliers suppliers)
        {
            if (id != suppliers.Sid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _contextSupplier.Update(suppliers);
                    await _contextSupplier.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SuppliersExists(suppliers.Sid))
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
            return View(suppliers);
        }

        // GET: Suppliers/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var suppliers = await _contextSupplier.Suppliers
                .FirstOrDefaultAsync(m => m.Sid == id);
            if (suppliers == null)
            {
                return NotFound();
            }

            return View(suppliers);
        }

        // POST: Suppliers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var suppliers = await _contextSupplier.Suppliers.FindAsync(id);
            _contextSupplier.Suppliers.Remove(suppliers);
            await _contextSupplier.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SuppliersExists(string id)
        {
            return _contextSupplier.Suppliers.Any(e => e.Sid == id);
        }
    }
}
