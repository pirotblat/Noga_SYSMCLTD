using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SYSMCLTD_Api.Data;

namespace SYSMCLTD_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly DataContext _context;

        public AddressesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Addresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            return await _context.Addresses.Where(c => c.isDeleted == false).ToListAsync();
        }

        [HttpGet("customerAddresses/{customerId}")]
        public async Task<ActionResult<IEnumerable<Address>>> customerAddresses(int customerId)
        {
            try
            {
                var addresses = await _context.Addresses.Where(c => c.customerId == customerId && c.isDeleted == false).ToListAsync();
                return addresses;
            }
            catch (Exception e)
            {

                throw e;
            }

            
            //return await _context.Addresses.Where(c => c.customerId == customerId).ToListAsync();
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        // PUT: api/Addresses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(int id, Address address)
        {
            if (id != address.id)
            {
                return BadRequest();
            }

            _context.Entry(address).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Addresses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Address>> PostAddress(Address address)
        {
            address.isDeleted = false;
            address.created = DateTime.Today;
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddress", new { id = address.id }, address);
        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Address>> DeleteAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);
            if (address == null)
            {
                return NotFound();
            }

            //_context.Addresses.Remove(address);
            //await _context.SaveChangesAsync();
            address.isDeleted = true;
            _ = await PutAddress(id, address);

            return address;
        }

        private bool AddressExists(int id)
        {
            return _context.Addresses.Any(e => e.id == id);
        }
    }
}
