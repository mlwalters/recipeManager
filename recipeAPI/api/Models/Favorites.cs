namespace api.Models
{
    public class Favorites
    {
        // public string UserEmail { get; set; }
        public ICollection<int> RecipeIds { get; set; }
    }
}