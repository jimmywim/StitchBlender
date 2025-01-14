using Azure.Storage.Blobs;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using StitchBlender.Server.Models.Options;
using StitchBlender.Server.Models.Patterns;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace StitchBlender.Server.Services
{
    public class StitchBlenderBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly ILogger logger;
        public StitchBlenderBlobService(IOptions<StitchBlenderOptions> options, ILogger<StitchBlenderBlobService> logger)
        {
            _blobServiceClient = new BlobServiceClient(options.Value.StorageConnection);
            this.logger = logger;
        }

        public async Task<List<Pattern>> GetAllPatterns(string userId)
        {
            var builtInPatterns = await GetBlob<List<Pattern>>("patterns", "built-in-patterns.json");

            return builtInPatterns;
        }

        public async Task StoreBlob(string path, object contents, string containerName)
        {
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            await container.CreateIfNotExistsAsync();

            var blobRef = container.GetBlobClient(path);

            string? blobContents;
            if (contents.GetType() == typeof(string))
            {
                blobContents = contents.ToString();
            }
            else
            {
                blobContents = JsonSerializer.Serialize(contents);
            }

            try
            {
                if (blobContents != null)
                {
                    await blobRef.UploadAsync(new BinaryData(blobContents), true);
                }
            }
            catch (Exception ex)
            {
                logger.LogWarning($"Failed to store blob at {path}: {ex.Message}");
            }
        }

        private async Task<T> GetBlob<T>(string containerName, string blobName)
        {
            var container = _blobServiceClient.GetBlobContainerClient(containerName);
            await container.CreateIfNotExistsAsync();

            var blobClient = container.GetBlobClient(blobName);

            try
            {
                var content = await blobClient.DownloadContentAsync();
                var str = content.Value.Content.ToString();
                var obj = JsonSerializer.Deserialize<T>(str);
                return obj;
            }
            catch (Exception ex)
            {
                return default;
            }
        }
    }
}
