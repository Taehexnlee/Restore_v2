using API.Data;
using API.Entities;
using API.Extension;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductPrams productPrams)
        {
            var query = context.Products
                        .Sort(productPrams.OrderBy)
                        .Search(productPrams.SearchTerm)
                        .Filter(productPrams.Brand, productPrams.Types)
                        .AsQueryable();

            var products = await PageList<Product>.ToPageList(query, productPrams.PageNumber, productPrams.PageSize);


            Response.AddPaginationHeader(products.MetaData);
            return products;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
