
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
        public string Name { get; set; }
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }
        public AddIngredient(int id, string amount, Item item)
        {
            Id = id;
            Amount = amount;
            Name = Item.ItemName;
        }
        public AddIngredient(){}
    }
}