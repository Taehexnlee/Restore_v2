using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extension;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();
        return basket.ToDto();
    }
    [HttpPost]
    public async Task<ActionResult> AddItemToBasket([FromQuery]int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        basket ??= CreateBasket();

        var product = await context.Products.FindAsync(productId);
        if (product == null) return NotFound();

        basket.AddItem(product, quantity);
        var result = await context.SaveChangesAsync() > 0; 
        if(result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());


        return BadRequest("Problem saving x to basket");
    }



    [HttpDelete]
    public async Task<ActionResult<BasketDto>> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NotFound();
        basket.RemoveItem(productId, quantity);
        var result = await context.SaveChangesAsync() > 0;
        if (result) return basket.ToDto();
        return BadRequest("Problem removing item from the basket");
    }
    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddDays(30)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }
}
