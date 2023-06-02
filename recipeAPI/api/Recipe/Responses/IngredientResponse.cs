namespace api.Models
{
    public class IngredientResponse
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string Name { get; set; }
    }
    public class AddIngredient
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string Item { get; set; }
        public int RecipeId { get; set;}
    }
}