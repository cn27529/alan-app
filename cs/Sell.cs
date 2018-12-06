using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVCTonSqlLdb.Models;

namespace MVCTonSqlLdb.ViewModels
{
    public class Sell
    {
        public IEnumerable<Customer> customers { get; set; }
        public IEnumerable<ProductSell> products { get; set; }
        public IEnumerable<PriceSell> prices { get; set; }
    }
}
