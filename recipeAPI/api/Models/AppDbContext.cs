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
        public virtual DbSet<Ingredient> Ingredients { get; set; }
        
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ShoppingItem> ShoppingList { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasData(
                new User
                {
                    Id = 1,
                    Name = "Maricar Walters",
                    Email = "carrimax.dev@gmail.com"
                },
                new User
                {
                    Id = 2,
                    Name = "Kai",
                    Email = "raciram@gmail.com"
                }
            );

            // modelBuilder.Entity<Recipe>()
            // .Property(u => u.UserId);

            modelBuilder.Entity<Recipe>()
            .Property(c => c.CategoryId)
            .HasConversion<int>();

            modelBuilder
            .Entity<Category>()
            .Property(c => c.Id)
            .HasConversion<int>();

            modelBuilder
            .Entity<Category>().HasData(
                Enum.GetValues(typeof(CategoryId))
                    .Cast<CategoryId>()
                    .Select(c => new Category()
                    {
                        Id = c,
                        Name = c.ToString()
                    })
            );

            modelBuilder.Entity<Recipe>()
            .HasData(
                new Recipe
                {
                    Id = 1,
                    Name = "Strawberry Cheesecake",
                    Description = "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.",
                    ServingSize = 12,
                    Favorite = true,
                    CategoryId = CategoryId.Dessert,
                    Notes = "This is my favorite cheesecake recipe.",
                    ImageUrl = "https://cdn.pixabay.com/photo/2020/02/07/21/12/cheesecake-4828403_960_720.jpg",
                    UserEmail = "carrimax.dev@gmail.com"
                    // UserId = 1
                },
                new Recipe
                {
                    Id = 2,
                    Name = "Lentil Soup",
                    Description = "The touch of spices and finishing it off with lemon really lifts this soup to the next level.",
                    ServingSize = 6,
                    Favorite = true,
                    CategoryId = CategoryId.Soup,
                    Notes = "",
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/05/19/00/27/lentil-soup-2325144_960_720.jpg",
                    UserEmail = "carrimax.dev@gmail.com"
                    // UserId = 1
                },
                new Recipe
                {
                    Id = 3,
                    Name = "Cosmopolitan Cocktail",
                    Description = "A wonderful classic, elegant cocktail",
                    ServingSize = 6,
                    Favorite = false,
                    CategoryId = CategoryId.Drinks,
                    Notes = "",
                    ImageUrl = "https://images.unsplash.com/photo-1617524124781-38a0e1d71ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29zbW9wb2xpdGFuJTIwY29ja3RhaWx8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                    UserEmail = "carrimax.dev@gmail.com"
                    // UserId = 2
                },
                new Recipe
                {
                    Id = 4,
                    Name = "Prime Rib",
                    Description = "Also known as Standing Rib Roast, this is slathered in a herb and garlic butter, then roasted to juicy perfection.",
                    ServingSize = 6,
                    Favorite = true,
                    CategoryId = CategoryId.Beef,
                    Notes = "Use any cut of prime rib – with the bones attached, trimmed and frenched.",
                    ImageUrl = "https://cdn.pixabay.com/photo/2018/12/29/00/40/prime-rib-3900674_960_720.jpg",
                    UserEmail = "raciram@gmail.com"
                    // UserId = 1
                }
            );

            modelBuilder.Entity<Instruction>()
            .HasData(
                new
                {
                    Id = 1,
                    Step = "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection).",
                    RecipeId = 1
                },
                new
                {
                    Id = 2,
                    Step = "Butter and line the side of the pan.",
                    RecipeId = 1
                },
                new
                {
                    Id = 3,
                    Step = "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.",
                    RecipeId = 2
                },
                new
                {
                    Id = 4,
                    Step = "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet.",
                    RecipeId = 2
                },
                new
                {
                    Id = 5,
                    Step = "Fill cocktail shaker with ice.",
                    RecipeId = 3
                },
                new
                {
                    Id = 6,
                    Step = "Add vodka, cointreau, cranberry juice and lime. Shake vigorously 10 times.",
                    RecipeId = 3
                },
                new
                {
                    Id = 7,
                    Step = "Strain into chilled martini glass. Garnish with orange peel.",
                    RecipeId = 3
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
                },
                new
                {
                    Id = 4,
                    ItemName = "vodka",
                },
                new
                {
                    Id = 5,
                    ItemName = "cranberry juice",
                },
                new
                {
                    Id = 6,
                    ItemName = "cointreu",
                }
            );

            modelBuilder.Entity<Ingredient>()
            .HasData(
                new
                {
                    Id = 1,
                    Amount = "1/2 tsp",
                    ItemId = 1,
                    RecipeId = 1
                },
                new
                {
                    Id = 2,
                    Amount = "1 cup",
                    ItemId = 2,
                    RecipeId = 1
                },
                new
                {
                    Id = 3,
                    Amount = "3 cups",
                    ItemId = 3,
                    RecipeId = 2
                },
                new
                {
                    Id = 4,
                    Amount = "1 tsp",
                    ItemId = 1,
                    RecipeId = 2
                },
                new
                {
                    Id = 5,
                    Amount = "60ml",
                    ItemId = 4,
                    RecipeId = 3
                },
                new
                {
                    Id = 6,
                    Amount = "30 ml",
                    ItemId = 6,
                    RecipeId = 3
                },
                new
                {
                    Id = 7,
                    Amount = "90 ml",
                    ItemId = 5,
                    RecipeId = 3
                }
            );
        }
    }
}