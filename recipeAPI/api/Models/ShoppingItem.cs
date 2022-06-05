namespace api.Models
{
    public class ShoppingItem
    {
        public int Id { get; set; }
        public string ListItem { get; set; } // do I need this here or maybe only for the response?
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }
        public bool Checked { get; set; } = false;
    }
}