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
        Sauces = 7,
        Sides = 8,
        Bread = 9,
        Vegetarian = 10,
        Snack = 11,
        Drinks = 12
    }

    public class CategoryResponse
    {
        public CategoryId Id { get; set; }
        public string Name { get; set; }
    }
}