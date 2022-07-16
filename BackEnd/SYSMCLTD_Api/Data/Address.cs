using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SYSMCLTD_Api.Data
{
    public class Address
    {
        [Key]
        public int id { get; set; }
        public string city { get; set; }
        public string street { get; set; }
        public int customerId { get; set; }
        public bool? isDeleted { get; set; }
        public DateTime? created { get; set; }
    }
}
