using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() { }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Recipe> Recipes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Recipe>()
                .HasData(
                    new
                    {
                        Id = 1,
                        Name = "Strawberry Cheesecake",
                        Description = "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.",
                        ServingSize = 12,
                        Notes = "This is my favorite cheesecake recipe."
                    },
                    new
                    {
                        Id = 2,
                        Name = "Lentil Soup",
                        Description = "The touch of spices and finishing it off with lemon really lifts this soup to the next level.",
                        ServingSize = 6,
                        Notes = ""
                    }
            );
        }
    }
}