using System;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order>  Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "d428c964-2e97-44e8-a3b0-6254cb147c33", Name = "Member", NormalizedName = "MEMBER" },
                 new IdentityRole { Id = "2b9ec42e-f5b3-4be8-bca7-abd5d646d108", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }

    
}
