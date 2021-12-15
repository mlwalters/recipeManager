using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class InsertSeedDataAppDbContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Description", "Name", "Notes", "ServingSize" },
                values: new object[] { 1, "A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.", "Strawberry Cheesecake", "This is my favorite cheesecake recipe.", 12 });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Description", "Name", "Notes", "ServingSize" },
                values: new object[] { 2, "The touch of spices and finishing it off with lemon really lifts this soup to the next level.", "Lentil Soup", "", 6 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
