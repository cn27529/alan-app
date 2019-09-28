using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMVC01.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CoreMVC01.ViewModels.Sells
{
    public class SellIndexViewmodel
    {
        public IEnumerable<Customers> Customers { get; set; }
        public IEnumerable<Products> Products { get; set; }
        public IEnumerable<Sell> Sells { get; set; }
        public IEnumerable<SelectListItem> CustomerList { get; set; }
        public IEnumerable<ClassForCompany> classForCompanies { get; set; }
        public IEnumerable<ClassForProduct> classForProducts { get; set; }
    }
}
