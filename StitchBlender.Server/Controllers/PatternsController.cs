using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StitchBlender.Server.Models.Patterns;
using StitchBlender.Server.Services;
using System.Collections;

namespace StitchBlender.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PatternsController : Controller
    {
        private readonly StitchBlenderBlobService blobService;
        public PatternsController(StitchBlenderBlobService stitchBlenderBlobService)
        {
            blobService = stitchBlenderBlobService;
        }

        [HttpGet]
        public async Task<IEnumerable<Pattern>> Index()
        {
            var userId = User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;            
            return await blobService.GetAllPatterns(userId);
        }

        [HttpPut]
        public async Task SavePattern(Pattern pattern)
        {
            //if (pattern.BuiltIn)
            //{
            //    await blobService.StoreBlob($"{pattern.Id}.json", pattern, "patterns");
            //}
            //else
            //{
            //    var userId = User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
            //    await blobService.StoreBlob($"{userId}/{pattern.Id}.json", pattern, "patterns");

            //}

            var builtIn = await blobService.GetAllPatterns("");
            if (builtIn.Any(p => p.Id == pattern.Id))
            {
                var p = builtIn.First(p => p.Id == pattern.Id);
                builtIn.Remove(p);
                
            }

            builtIn.Add(pattern);

            await blobService.StoreBlob($"built-in-patterns.json", builtIn, "patterns");

        }
    }
}
