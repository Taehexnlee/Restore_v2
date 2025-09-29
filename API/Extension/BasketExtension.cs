using System;
using API.DTOs;
using API.Entities;

namespace API.Extension;

public static class BasketExtension
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                PictureUrl = x.Product.PictureUrl,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                Quantity = x.Quantity
            }).ToList()
        };
    }
}
