using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Item
    {
        public int Id { get; set; }
        private string _itemName;
        public string ItemName
        { 
            get => _itemName.ToLower();
            set => value.ToLower();
        }
    }
}