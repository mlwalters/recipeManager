// using System.Text.Json;
// using Microsoft.AspNetCore.Mvc;
// using api.Models;

// namespace api.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class SampleController : ControllerBase
//     {
//         // Have a method that gets all news, based on the NewsGetter model 
//         // Should I do all news here? Or put the logic in the FE?
//         // OR
//         // Should it be broken down to source or category (have different get methods, one for by source, one by category, or all?
//         // Limitations: Only 5 articles per request

//         private readonly IHttpClientFactory _httpClientFactory;
//         public SampleController(IHttpClientFactory httpClientFactory)
//         {
//             _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
//         }
        
//         // GET: api/NewsArticle
//         [HttpGet]
//         //[Route("")]
//         public async Task<ActionResult<IEnumerable<NewsArticle>>> GetNews() // Or just put all of these in the controller? Might be easier
//         {
//             var httpClient = _httpClientFactory.CreateClient("TheNewsAPI");
//             var allNews = new List<NewsArticle>();
//      
//             // all?api_token={api_token}

//             var httpResponseMessage = await httpClient.GetAsync($"all?api_token={api_token}");

//             if (httpResponseMessage.IsSuccessStatusCode)
//             {
//                 using var contentStream = await httpResponseMessage.Content.ReadAsStreamAsync();
                
//                 allNews = await JsonSerializer.DeserializeAsync
//                     <List<NewsArticle>>(contentStream);
//             }
//             return Ok(allNews);
//         }

//     }
// }