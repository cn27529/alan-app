using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMVC01.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CoreMVC01.ViewModels.Sells
{
    public class SellViewModel
    {
        public class Sellcustomer : ClassForCompany
        {
            public IList<Customers> Customers { get; set; }
        }

        public class Sellproduct : ClassForProduct
        {
            public IList<Products> Products { get; set; }
        }
    }
}
