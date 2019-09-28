using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMVC01.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections;

namespace CoreMVC01.ViewModels.Purchases
{
    public class PurchasesIndexViewModel
    {
        public IEnumerable<Suppliers> Supplier { get; set; }
        public IEnumerable<Purchase> Purchase { get; set; }
        
        public IEnumerable<SelectListItem> SupplierList { get; set; }

        //public List<Suppliers>SupplierName { get; set; }
        //public List<String> PurchaseName { get; set; }
    }
}
