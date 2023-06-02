namespace api.Models
{
    public class GroceryItem
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }
        public bool Checked { get; set; } = false;
        public string UserEmail { get; set; }
    }
}