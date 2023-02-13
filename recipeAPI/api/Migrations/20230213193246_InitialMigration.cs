using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GroceryList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    Checked = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserEmail = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroceryList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroceryList_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    ServingSize = table.Column<int>(type: "INTEGER", nullable: false),
                    Favorite = table.Column<bool>(type: "INTEGER", nullable: false),
                    CategoryId = table.Column<int>(type: "INTEGER", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    UserEmail = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Amount = table.Column<string>(type: "TEXT", nullable: true),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: false)
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Step = table.Column<string>(type: "TEXT", maxLength: 300, nullable: true),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: false)
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
                values: new object[] { 0, "Seafood" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Beef" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Pork" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "Poultry" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 4, "Soup" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 5, "Dessert" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 6, "Salad" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 7, "Sauces" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 8, "Sides" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 9, "Bread" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 10, "Vegetarian" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 11, "Snack" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[] { 12, "Drinks" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[] { 1, "salt" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[] { 2, "sugar" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[] { 3, "brown lentils" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[] { 4, "vodka" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[] { 5, "cranberry juice" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "ItemName" },
                values: new object[] { 6, "cointreu" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name" },
                values: new object[] { 1, "carrimax.dev@gmail.com", "Maricar Walters" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name" },
                values: new object[] { 2, "raciram@gmail.com", "Kai" });

            migrationBuilder.InsertData(
                table: "GroceryList",
                columns: new[] { "Id", "Checked", "ItemId", "UserEmail" },
                values: new object[] { 1, false, 1, "carrimax.dev@gmail.com" });

            migrationBuilder.InsertData(
                table: "GroceryList",
                columns: new[] { "Id", "Checked", "ItemId", "UserEmail" },
                values: new object[] { 2, false, 2, "carrimax.dev@gmail.com" });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Favorite", "ImageUrl", "Name", "Notes", "ServingSize", "UserEmail", "UserId" },
                values: new object[] { 1, 5, "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.", true, "https://cdn.pixabay.com/photo/2020/02/07/21/12/cheesecake-4828403_960_720.jpg", "Strawberry Cheesecake", "This is my favorite cheesecake recipe.", 12, "carrimax.dev@gmail.com", null });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Favorite", "ImageUrl", "Name", "Notes", "ServingSize", "UserEmail", "UserId" },
                values: new object[] { 2, 4, "The touch of spices and finishing it off with lemon really lifts this soup to the next level.", true, "https://cdn.pixabay.com/photo/2017/05/19/00/27/lentil-soup-2325144_960_720.jpg", "Lentil Soup", "", 6, "carrimax.dev@gmail.com", null });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Favorite", "ImageUrl", "Name", "Notes", "ServingSize", "UserEmail", "UserId" },
                values: new object[] { 3, 12, "A wonderful classic, elegant cocktail", false, "https://images.unsplash.com/photo-1617524124781-38a0e1d71ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29zbW9wb2xpdGFuJTIwY29ja3RhaWx8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", "Cosmopolitan Cocktail", "", 6, "carrimax.dev@gmail.com", null });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Favorite", "ImageUrl", "Name", "Notes", "ServingSize", "UserEmail", "UserId" },
                values: new object[] { 4, 1, "Also known as Standing Rib Roast, this is slathered in a herb and garlic butter, then roasted to juicy perfection.", true, "https://cdn.pixabay.com/photo/2018/12/29/00/40/prime-rib-3900674_960_720.jpg", "Prime Rib", "Use any cut of prime rib – with the bones attached, trimmed and frenched.", 6, "raciram@gmail.com", null });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 1, "1/2 tsp", 1, 1 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 2, "1 cup", 2, 1 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 3, "3 cups", 3, 2 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 4, "1 tsp", 1, 2 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 5, "60ml", 4, 3 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 6, "30 ml", 6, 3 });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "ItemId", "RecipeId" },
                values: new object[] { 7, "90 ml", 5, 3 });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 1, 1, "Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection)." });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 2, 1, "Butter and line the side of the pan." });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 3, 2, "Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes." });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 4, 2, "Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet." });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 5, 3, "Fill cocktail shaker with ice." });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 6, 3, "Add vodka, cointreau, cranberry juice and lime. Shake vigorously 10 times." });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "RecipeId", "Step" },
                values: new object[] { 7, 3, "Strain into chilled martini glass. Garnish with orange peel." });

            migrationBuilder.CreateIndex(
                name: "IX_GroceryList_ItemId",
                table: "GroceryList",
                column: "ItemId");

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
                name: "GroceryList");

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
