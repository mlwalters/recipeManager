using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Moq;
using Newtonsoft.Json;

namespace backend.Tests.Utils
{
    public static class TestUtils
    {
        public static readonly string RECIPE_NAME = "Filipino Chicken Adobo";
        public static readonly string RECIPE_DESCRIPTION = "Intense in flavour, but so fast and easy to prepare!";
        public static readonly int RECIPE_SERVING_SIZE = 4;
        public static readonly string RECIPE_NOTES = "One of the most amazing Asian chicken thigh recipes I have ever come across.";

        public static Mock<HttpRequest> CreateMockRequest(string method, object body = null, Dictionary<string, string> querystring = null)
        {
            var ms = new MemoryStream();
            var sw = new StreamWriter(ms);
            var json = JsonConvert.SerializeObject(body);
            sw.Write(json);
            sw.Flush();
            ms.Position = 0;
            var mockRequest = new Mock<HttpRequest>();
            var mockHttpContext = new Mock<HttpContext>();
            var mockHttpResponse = new Mock<HttpResponse>();
            var mockHttpHeaders = new Mock<IHeaderDictionary>();
            mockRequest.Setup(x => x.HttpContext).Returns(mockHttpContext.Object);
            mockHttpContext.Setup(x => x.Response).Returns(mockHttpResponse.Object);
            mockHttpResponse.Setup(x => x.Headers).Returns(mockHttpHeaders.Object);

            if (body != null)
            {
                mockRequest.Setup(x => x.Body).Returns(ms);
            }

            if (querystring != null)
            {
                foreach (var item in querystring)
                {
                    mockRequest.Setup(x => x.Query[item.Key]).Returns(item.Value);
                }
            }

            mockRequest.Setup(y => y.Method).Returns(method);

            return mockRequest;
        }

        public static async Task<AppDbContext> GetTestDbContext()
        {
            var db = new AppDbContext(CreateOptions());
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();

            var recipe = new Recipe(RECIPE_NAME, RECIPE_DESCRIPTION, RECIPE_SERVING_SIZE, RECIPE_NOTES);
            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();

            return db;
        }

        private static DbContextOptions<AppDbContext> CreateOptions()
        {
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();

            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseSqlite(connection);

            builder.ConfigureWarnings(x => x.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.AmbientTransactionWarning));

            return builder.Options;
        }
    }
}