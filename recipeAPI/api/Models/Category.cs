
namespace api.Models
{
    public class Category
    {
        public CategoryId Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Recipe> Recipes { get; set; }
    }

    public enum CategoryId : int
    {
        Seafood = 0,
        Beef = 1,
        Pork = 2,
        Poultry = 3,
        Soup = 4,
        Dessert = 5,
        Salad = 6,
        DipsAndSauces = 7,
        Sides = 8,
        Bread = 9,
        VegetarianOrVegan = 10,
        Snack = 11
    }

    public class CategoryRequest
    {
        public CategoryId Id { get; set; }
        public string Name { get; set; }
    }
}