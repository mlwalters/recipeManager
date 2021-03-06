namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ServingSize { get; set; }
        public bool Favorite { get; set; } = false;
        public virtual Category Category { get; set; }
        public CategoryId CategoryId { get; set; }
        public string Notes { get; set; }
        public string UserEmail { get; set; }
        // public virtual User User { get; set; }
        // public int UserId{ get; set; }

        public virtual ICollection<Instruction> Instructions { get; set; }
        public virtual ICollection<Ingredient> Ingredients { get; set; }

        public Recipe(string name)
        {
            Name = name;
        }
        public Recipe() { }
    }
}