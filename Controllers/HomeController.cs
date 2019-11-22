using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestDragDropPdf.Models;
using TestDragDropPdf.Services;

namespace TestDragDropPdf.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly BlobStorage _blogStorage;

        public HomeController(ILogger<HomeController> logger, BlobStorage blobStorage)
        {
            _logger = logger;
            _blogStorage = blobStorage;

        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> uploadPdf(Item item)
        {
            using (var stream = new MemoryStream())
            {
                var str = await _blogStorage.UploadStreaImage(stream, item.File.FileName,
                    "img");
                //  user.ImageURL = str;
            }

            return null;

        }




        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
