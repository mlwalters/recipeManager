
namespace api.Models
{
    public class IngredientResponse
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string Name { get; set; }
    }

    // Remember: This is a request/post
    public class AddIngredient
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string Name { get; set; }
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }

    }
}