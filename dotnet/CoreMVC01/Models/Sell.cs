using System;
using System.Collections.Generic;

namespace CoreMVC01.Models
{
    public partial class Sell
    {
        public string Cid { get; set; }
        public string Pid { get; set; }
        public decimal? SellPrice { get; set; }
    }
}
