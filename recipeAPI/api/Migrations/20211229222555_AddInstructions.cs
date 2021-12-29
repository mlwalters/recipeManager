using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class AddInstructions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "IX_Instructions_RecipeId",
                table: "Instructions",
                column: "RecipeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Instructions");
        }
    }
}
