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
        public ActionResult SaveCreate(string data)
        {
            SellSaveModel model = JsonConvert.DeserializeObject<SellSaveModel>(data);
            //Console.WriteLine(data);
            var result = new { result = "ok", errorMessage = "", data = data, model = model };
            return Json(result);
        }

    }
}
