﻿// <auto-generated />
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
                            Name = "DipsAndSauces"
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
                            Name = "VegetarianOrVegan"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Snack"
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

                    b.Property<int>("StepNumber")
                        .HasMaxLength(30)
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.ToTable("Instructions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RecipeId = 1,
                            Step = "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection).",
                            StepNumber = 1
                        },
                        new
                        {
                            Id = 2,
                            RecipeId = 1,
                            Step = "Butter and line the side of the pan.",
                            StepNumber = 2
                        },
                        new
                        {
                            Id = 3,
                            RecipeId = 2,
                            Step = "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.",
                            StepNumber = 1
                        },
                        new
                        {
                            Id = 4,
                            RecipeId = 2,
                            Step = "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet.",
                            StepNumber = 2
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

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ServingSize")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
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
                            Name = "Strawberry Cheesecake",
                            Notes = "This is my favorite cheesecake recipe.",
                            ServingSize = 12,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 4,
                            Description = "The touch of spices and finishing it off with lemon really lifts this soup to the next level.",
                            Name = "Lentil Soup",
                            Notes = "",
                            ServingSize = 6,
                            UserId = 1
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
                            Email = "jofoda1740@afarek.com",
                            Name = "Midnight Firespark"
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

                    b.HasOne("api.Models.User", "User")
                        .WithMany("Recipes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("User");
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
