using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SYSMCLTD_Api.Data
{
    public class Customer
    {
        [Key]
        public int id { get; set; }
        public int customerId { get; set; }
        public string name { get; set; }
        public int customerNumber { get; set; }
        public bool? isDeleted { get; set; }
        public DateTime? created { get; set; }
        public Address[] addresses { get; set; }
        public Contact[] contacts { get; set; }
    }
}
