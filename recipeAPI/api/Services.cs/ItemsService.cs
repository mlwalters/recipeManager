using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public interface IItemsService
{
    Task<Item> AddItemByName(string itemName);
}

public class ItemsService : IItemsService
{
    private readonly AppDbContext _db;
    private readonly ILogger<ItemsService> _logger;

    public ItemsService(AppDbContext db, ILogger<ItemsService> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<Item> AddItemByName(string itemName)
    {
        var items = await _db.Items.ToListAsync();
        Item itemToAdd = items.FirstOrDefault(i => i.ItemName.Trim().ToLower() == itemName.Trim().ToLower(), new Item { ItemName = itemName.Trim().ToLower() });
        _db.Items.Add(itemToAdd);
        await _db.SaveChangesAsync();
        return itemToAdd;
    }
}
