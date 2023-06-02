using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class Instruction
    {
        public int Id { get; set; }

        [MaxLength(300)]
        public string Step { get; set; }
        public int RecipeId { get; set; }
        public virtual Recipe Recipe { get; set; }
    }
}