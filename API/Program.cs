using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();

app.UseCors(x =>
{
    x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3001");
}
);

app.MapControllers();

DbInitializer.InitDb(app);
app.Run();
