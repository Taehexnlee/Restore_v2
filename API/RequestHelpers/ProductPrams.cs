using System;

namespace API.RequestHelpers;

public class ProductPrams : PaginationPrams
{
    public string? OrderBy { get; set; }
    public string? SearchTerm { get; set; }
    public string? Brand { get; set; }
    public string? Types { get; set; }
}
 