using API.Data;
using API.MiddeleWare;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleWare>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleWare>();
app.UseCors(x =>
{
    x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3001");
}
);

app.MapControllers();

DbInitializer.InitDb(app);
app.Run();
