using System;
using System.Collections.Generic;

namespace CoreMVC01.Models
{
    public partial class Purchase
    {
        public string Spid { get; set; }
        public string Sid { get; set; }
        public string Spname { get; set; }
        public string Specification { get; set; }
        public string Spunit { get; set; }
        public decimal? Spprice { get; set; }
        public DateTime? SplastDate { get; set; }
        public decimal? SpbeforePrice { get; set; }
        public DateTime? SpbeforeDate { get; set; }
        public string Note { get; set; }
        public string Pid { get; set; }
    }
}
