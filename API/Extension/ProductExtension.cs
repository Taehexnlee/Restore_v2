using System;
using API.Entities;

namespace API.Extension;

public static class ProductExtension
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy))
        {
            return query.OrderBy(x => x.Name);
        }

        return orderBy.Trim().ToLower() switch
        {
            "price" => query.OrderBy(x => x.Price),
            "pricedesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };
    } 

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm)) return query;

        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brand, string? types)
    {
        var brandList = new List<string>();
        var typeList = new List<string>();

        if (!string.IsNullOrWhiteSpace(brand))
        {
            brandList.AddRange([.. brand.ToLower().Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)]);
        }

        if (!string.IsNullOrWhiteSpace(types))
        {
            typeList.AddRange([.. types.ToLower().Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)]);
        }

        query = query.Where(x => brandList.Count == 0 || (x.Brand != null && brandList.Contains(x.Brand.ToLower())));
        query = query.Where(x => typeList.Count == 0 || (x.Type != null && typeList.Contains(x.Type.ToLower())));

        return query;
    }
}
