using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServingSize = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipes_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    RecipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingredients_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ingredients_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Instructions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Step = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    StepNumber = table.Column<int>(type: "int", maxLength: 30, nullable: false),
                    RecipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instructions_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 0, "Seafood" },
                    { 1, "Beef" },
                    { 2, "Pork" },
                    { 3, "Poultry" },
                    { 4, "Soup" },
                    { 5, "Dessert" },
                    { 6, "Salad" },
                    { 7, "DipsAndSauces" },
                    { 8, "Sides" },
                    { 9, "Bread" },
                    { 10, "VegetarianOrVegan" },
                    { 11, "Snack" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[,]
                {
                    { 1, "salt" },
                    { 2, "sugar" },
                    { 3, "brown lentils" }
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Name", "Notes", "ServingSize" },
                values: new object[] { 1, 5, "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.", "Strawberry Cheesecake", "This is my favorite cheesecake recipe.", 12 });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Name", "Notes", "ServingSize" },
                values: new object[] { 2, 4, "The touch of spices and finishing it off with lemon really lifts this soup to the next level.", "Lentil Soup", "", 6 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[,]
                {
                    { 1, "1/2 tsp", 1, 1 },
                    { 2, "1 cup", 2, 1 },
                    { 3, "3 cups", 3, 2 },
                    { 4, "1 tsp", 1, 2 }
                });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step", "StepNumber" },
                values: new object[,]
                {
                    { 1, 1, "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection).", 1 },
                    { 2, 1, "Butter and line the side of the pan.", 2 },
                    { 3, 2, "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.", 1 },
                    { 4, 2, "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet.", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_ItemId",
                table: "Ingredients",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_RecipeId",
                table: "Ingredients",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructions_RecipeId",
                table: "Instructions",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Instructions");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
