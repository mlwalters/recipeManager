using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AddSeededGroceryItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.CreateTable(
                name: "GroceryList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Checked = table.Column<bool>(type: "bit", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true)
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

            migrationBuilder.InsertData(
                table: "GroceryList",
                columns: new[] { "Id", "Checked", "ItemId", "UserEmail" },
                values: new object[] { 1, false, 1, "carrimax.dev@gmail.com" });

            migrationBuilder.InsertData(
                table: "GroceryList",
                columns: new[] { "Id", "Checked", "ItemId", "UserEmail" },
                values: new object[] { 2, false, 2, "carrimax.dev@gmail.com" });

            migrationBuilder.CreateIndex(
                name: "IX_GroceryList_ItemId",
                table: "GroceryList",
                column: "ItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroceryList");

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
        }
    }
}
