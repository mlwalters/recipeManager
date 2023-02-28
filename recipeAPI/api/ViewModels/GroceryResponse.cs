namespace api.Models

{
    public class GroceryItemResponse
    {
        public int Id { get; set; }
        // Do I need ItemID here?
        public string Name { get; set; }
        public bool isChecked { get; set; }
        public string UserEmail { get; set; }
        public GroceryItemResponse(GroceryItem groceryItem) 
        {
            Id = groceryItem.Id;
            Name = groceryItem.Item.ItemName;
            isChecked =  groceryItem.isChecked;
            UserEmail = groceryItem.UserEmail;
        }
    }

    public class AddGroceryItem
    {
        public int Id { get; set; }
        public virtual Item Item { get; set; }  
        public int ItemId { get; set; }
        public bool isChecked { get; set; }
        public string UserEmail { get; set; }
    }

    public class AddGroceryRequest
    {
        public string ItemName { get; set; }  
        public string UserEmail { get; set; }
    }
}