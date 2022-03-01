﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Models;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("api.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 0,
                            Name = "Seafood"
                        },
                        new
                        {
                            Id = 1,
                            Name = "Beef"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Pork"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Poultry"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Soup"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Dessert"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Salad"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Sauces"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Sides"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Bread"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Vegetarian"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Snack"
                        },
                        new
                        {
                            Id = 12,
                            Name = "Drinks"
                        });
                });

            modelBuilder.Entity("api.Models.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Amount")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.HasIndex("RecipeId");

                    b.ToTable("Ingredients");

                    b.HasData(
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
                        });
                });

            modelBuilder.Entity("api.Models.Instruction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.Property<string>("Step")
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.ToTable("Instructions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RecipeId = 1,
                            Step = "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection)."
                        },
                        new
                        {
                            Id = 2,
                            RecipeId = 1,
                            Step = "Butter and line the side of the pan."
                        },
                        new
                        {
                            Id = 3,
                            RecipeId = 2,
                            Step = "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes."
                        },
                        new
                        {
                            Id = 4,
                            RecipeId = 2,
                            Step = "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet."
                        },
                        new
                        {
                            Id = 5,
                            RecipeId = 3,
                            Step = "Fill cocktail shaker with ice."
                        },
                        new
                        {
                            Id = 6,
                            RecipeId = 3,
                            Step = "Add vodka, cointreau, cranberry juice and lime. Shake vigorously 10 times."
                        },
                        new
                        {
                            Id = 7,
                            RecipeId = 3,
                            Step = "Strain into chilled martini glass. Garnish with orange peel."
                        });
                });

            modelBuilder.Entity("api.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Items");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ItemName = "salt"
                        },
                        new
                        {
                            Id = 2,
                            ItemName = "sugar"
                        },
                        new
                        {
                            Id = 3,
                            ItemName = "brown lentils"
                        },
                        new
                        {
                            Id = 4,
                            ItemName = "vodka"
                        },
                        new
                        {
                            Id = 5,
                            ItemName = "cranberry juice"
                        },
                        new
                        {
                            Id = 6,
                            ItemName = "cointreu"
                        });
                });

            modelBuilder.Entity("api.Models.Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Favorite")
                        .HasColumnType("bit");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ServingSize")
                        .HasColumnType("int");

                    b.Property<string>("UserEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Recipes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = 5,
                            Description = "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.",
                            Favorite = true,
                            ImageUrl = "https://cdn.pixabay.com/photo/2020/02/07/21/12/cheesecake-4828403_960_720.jpg",
                            Name = "Strawberry Cheesecake",
                            Notes = "This is my favorite cheesecake recipe.",
                            ServingSize = 12,
                            UserEmail = "carrimax.dev@gmail.com"
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 4,
                            Description = "The touch of spices and finishing it off with lemon really lifts this soup to the next level.",
                            Favorite = true,
                            ImageUrl = "https://cdn.pixabay.com/photo/2017/05/19/00/27/lentil-soup-2325144_960_720.jpg",
                            Name = "Lentil Soup",
                            Notes = "",
                            ServingSize = 6,
                            UserEmail = "carrimax.dev@gmail.com"
                        },
                        new
                        {
                            Id = 3,
                            CategoryId = 12,
                            Description = "A wonderful classic, elegant cocktail",
                            Favorite = false,
                            ImageUrl = "https://images.unsplash.com/photo-1617524124781-38a0e1d71ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29zbW9wb2xpdGFuJTIwY29ja3RhaWx8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                            Name = "Cosmopolitan Cocktail",
                            Notes = "",
                            ServingSize = 6,
                            UserEmail = "carrimax.dev@gmail.com"
                        },
                        new
                        {
                            Id = 4,
                            CategoryId = 1,
                            Description = "Also known as Standing Rib Roast, this is slathered in a herb and garlic butter, then roasted to juicy perfection.",
                            Favorite = true,
                            ImageUrl = "https://cdn.pixabay.com/photo/2018/12/29/00/40/prime-rib-3900674_960_720.jpg",
                            Name = "Prime Rib",
                            Notes = "Use any cut of prime rib – with the bones attached, trimmed and frenched.",
                            ServingSize = 6,
                            UserEmail = "raciram@gmail.com"
                        });
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "carrimax.dev@gmail.com",
                            Name = "Maricar Walters"
                        },
                        new
                        {
                            Id = 2,
                            Email = "raciram@gmail.com",
                            Name = "Kai"
                        });
                });

            modelBuilder.Entity("api.Models.Ingredient", b =>
                {
                    b.HasOne("api.Models.Item", "Item")
                        .WithMany("Ingredients")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Recipe", "Recipe")
                        .WithMany("Ingredients")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("api.Models.Instruction", b =>
                {
                    b.HasOne("api.Models.Recipe", "Recipe")
                        .WithMany("Instructions")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("api.Models.Recipe", b =>
                {
                    b.HasOne("api.Models.Category", "Category")
                        .WithMany("Recipes")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.User", null)
                        .WithMany("Recipes")
                        .HasForeignKey("UserId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("api.Models.Category", b =>
                {
                    b.Navigation("Recipes");
                });

            modelBuilder.Entity("api.Models.Item", b =>
                {
                    b.Navigation("Ingredients");
                });

            modelBuilder.Entity("api.Models.Recipe", b =>
                {
                    b.Navigation("Ingredients");

                    b.Navigation("Instructions");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Navigation("Recipes");
                });
#pragma warning restore 612, 618
        }
    }
}
