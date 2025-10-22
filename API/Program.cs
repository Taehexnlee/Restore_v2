using API.Data;
using API.Entities;
using API.MiddeleWare;
using API.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleWare>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();


var app = builder.Build();

app.UseMiddleware<ExceptionMiddleWare>();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors(x =>
{
    x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3001");
}
);

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();
app.MapFallbackToController("Index", "Fallback");
await DbInitializer.InitDb(app);
app.Run();
