using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace api.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext() { }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<Instruction> Instructions { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        // public virtual DbSet<Ingredient> Ingredients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>()
            .HasData(
                new
                {
                    Id = 1,
                    Name = "Strawberry Cheesecake",
                    Description = "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.",
                    ServingSize = 12,
                    RecipeType = Category.Dessert,
                    Notes = "This is my favorite cheesecake recipe."
                },
                new
                {
                    Id = 2,
                    Name = "Lentil Soup",
                    Description = "The touch of spices and finishing it off with lemon really lifts this soup to the next level.",
                    RecipeType = Category.Poultry,
                    ServingSize = 6,
                    Notes = ""
                }
            );
            // modelBuilder.Entity<Recipe>()
            // .Property(r => r.RecipeType)
            // .HasConversion(
            //     c => c.ToString(),
            //     c => (Category).Enum.Parse(typeof(Category), c))
            // );
            modelBuilder.Entity<Instruction>()
            .HasData(
                new
                {
                    Id = 1,
                    Step = "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection).",
                    StepNumber = 1,
                    RecipeId = 1
                },
                new
                {
                    Id = 2,
                    Step = "Butter and line the side of the pan.",
                    StepNumber = 2,
                    RecipeId = 1
                },
                new
                {
                    Id = 3,
                    Step = "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.",
                    StepNumber = 1,
                    RecipeId = 2
                },
                new
                {
                    Id = 4,
                    Step = "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet.",
                    StepNumber = 2,
                    RecipeId = 2
                }
            );
            modelBuilder.Entity<Item>()
            .HasData(
                new
                {
                    Id = 1,
                    ItemName = "salt",
                },
                new
                {
                    Id = 2,
                    ItemName = "sugar",
                },
                new
                {
                    Id = 3,
                    ItemName = "brown lentils",
                }
            );
            // modelBuilder.Entity<Ingredient>()
            // .HasData(
            //     new
            //     {
            //         Id = 1,
            //         Amount = "1/2 tsp",
            //         ItemId = 1,
            //         RecipeId = 1
            //     },
            //     new
            //     {
            //         Id = 2,
            //         Amount = "1 cup",
            //         ItemId = 2,
            //         RecipeId = 1
            //     },
            //     new
            //     {
            //         Id = 3,
            //         Amount = "3 cups",
            //         ItemId = 3,
            //         RecipeId = 2
            //     },
            //     new
            //     {
            //         Id = 4,
            //         Amount = "1 tsp",
            //         ItemId = 1,
            //         RecipeId = 2
            //     }
            // );
        }
    }
}