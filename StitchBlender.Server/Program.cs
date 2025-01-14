
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using StitchBlender.Server.Models.Options;
using StitchBlender.Server.Services;

namespace StitchBlender.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddTransient<StitchBlenderBlobService, StitchBlenderBlobService>();


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(options =>
                {
                    builder.Configuration.Bind("AzureAd", options);
                    options.TokenValidationParameters.NameClaimType = "name";
                }, options => { builder.Configuration.Bind("AzureAd", options); });


            builder.Services.Configure<StitchBlenderOptions>(builder.Configuration.GetSection("StitchBlenderOptions"));

            var app = builder.Build();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
