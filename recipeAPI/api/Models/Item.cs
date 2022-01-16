using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
    }
}