using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.Products.Any())
            {
                JsonSerializerOptions options = new()
                {
                    RespectRequiredConstructorParameters = true
                };
    
                var productsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData, options);

                if (products == null) return;
                context.Products.AddRange(products);

                await context.SaveChangesAsync();
            }
        }
    }
}