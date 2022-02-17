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
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServingSize = table.Column<int>(type: "int", nullable: false),
                    Favorite = table.Column<bool>(type: "bit", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
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
                    table.ForeignKey(
                        name: "FK_Recipes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
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
                    { 7, "Sauces" },
                    { 8, "Sides" },
                    { 9, "Bread" },
                    { 10, "Vegetarian" },
                    { 11, "Snack" },
                    { 12, "Drinks" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[,]
                {
                    { 1, "salt" },
                    { 2, "sugar" },
                    { 3, "brown lentils" },
                    { 4, "vodka" },
                    { 5, "cranberry juice" },
                    { 6, "cointreu" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name" },
                values: new object[,]
                {
                    { 1, "carrimax.dev@gmail.com", "Maricar Walters" },
                    { 2, "raciram@gmail.com", "Kai" }
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Favorite", "ImageUrl", "Name", "Notes", "ServingSize", "UserEmail", "UserId" },
                values: new object[,]
                {
                    { 1, 5, "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.", true, null, "Strawberry Cheesecake", "This is my favorite cheesecake recipe.", 12, "carrimax.dev@gmail.com", null },
                    { 2, 4, "The touch of spices and finishing it off with lemon really lifts this soup to the next level.", true, null, "Lentil Soup", "", 6, "carrimax.dev@gmail.com", null },
                    { 3, 12, "A wonderful classic, elegant cocktail", false, null, "Cosmopolitan Cocktail", "", 6, "carrimax.dev@gmail.com", null },
                    { 4, 1, "Also known as Standing Rib Roast, this is slathered in a herb and garlic butter, then roasted to juicy perfection.", true, null, "Prime Rib", "Use any cut of prime rib – with the bones attached, trimmed and frenched.", 6, "raciram@gmail.com", null }
                });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[,]
                {
                    { 1, "1/2 tsp", 1, 1 },
                    { 2, "1 cup", 2, 1 },
                    { 3, "3 cups", 3, 2 },
                    { 4, "1 tsp", 1, 2 },
                    { 5, "60ml", 4, 3 },
                    { 6, "30 ml", 6, 3 },
                    { 7, "90 ml", 5, 3 }
                });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[,]
                {
                    { 1, 1, "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection)." },
                    { 2, 1, "Butter and line the side of the pan." },
                    { 3, 2, "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes." },
                    { 4, 2, "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet." },
                    { 5, 3, "Fill cocktail shaker with ice." },
                    { 6, 3, "Add vodka, cointreau, cranberry juice and lime. Shake vigorously 10 times." },
                    { 7, 3, "Strain into chilled martini glass. Garnish with orange peel." }
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

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_UserId",
                table: "Recipes",
                column: "UserId");
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

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
