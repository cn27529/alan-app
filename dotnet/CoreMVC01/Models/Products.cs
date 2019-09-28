using System;
using System.Collections.Generic;

namespace CoreMVC01.Models
{
    public partial class Products
    {
        public string Pid { get; set; }
        public string Pname { get; set; }
        public string Specification { get; set; }
        public string Unit { get; set; }
        public string BarCode { get; set; }
        public string ClassId { get; set; }
    }
}
