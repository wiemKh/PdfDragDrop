using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TestDragDropPdf.Models
{
    public class Item
    {

        [NotMapped]
        public IFormFile File { get; set; }
    }
}
