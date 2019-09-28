using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreMVC01.Models;
using CoreMVC01.ViewModels.Sells;
using Newtonsoft.Json;

namespace CoreMVC01.Controllers
{
    public class HelloController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveCreate(int SellPrice)
        {

            var result = new { result = "ok", errorMessage = "", qqq = 9999999 };
            return new JsonResult(result);
        }

    }
}
