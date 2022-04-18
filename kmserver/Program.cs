using NLog;
using NLog.Web;
using kmserver.Models;
using kmserver.Services;

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

try 
{ 
    var builder = WebApplication.CreateBuilder(args);

    // Add identity
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
        .AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>
        (
            builder.Configuration.GetSection("MongoDB").GetValue<string>("ConnectionString"),
            builder.Configuration.GetSection("MongoDB").GetValue<string>("Database")
        );


    // Add services to the container.
    builder.Services.AddControllers();

    // NLog: Setup NLog for Dependency injection
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
    builder.Host.UseNLog();

    // Security and CORS Policy
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    });

    // Services and Dependency Injection
    builder.Services.AddScoped<IQuizzesService, QuizzesService>();

    // Swagger API Documentation
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    // Enable Swagger
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "KouizMe Server API");
        c.RoutePrefix = string.Empty;
    });

    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Home/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseAuthorization();

    app.MapControllerRoute(
        name: "default",
        pattern: "api/{controller=Home}/{action=Index}/{id?}");

    logger.Info("KouizMe Server Starting...");
    app.Run();
}
catch (Exception exception)
{
    // NLog: catch setup errors
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
    NLog.LogManager.Shutdown();
}