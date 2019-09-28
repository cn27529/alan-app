using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMVC01.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CoreMVC01.ViewModels.Sells
{
    public class SellSaveModel
    {
        public string Specification { get; set; }
        public string Unit { get; set; }
        public string ClassId { get; set; }
        public string Cid { get; set; }
        public string ClassId2 { get; set; }
        public string Pid { get; set; }
        public int SellPrice { get; set; }
    }
}
