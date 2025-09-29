import { useMemo, useState } from "react";
import ProductList from "./ProductList";
import { useFetchProductQuery } from "./catalogApi";
import LoadingState from "../../app/components/LoadingState";
import EmptyState from "../../app/components/EmptyState";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

type SortOption = "featured" | "priceAsc" | "priceDesc" | "nameAsc";

export default function Catalog() {
  const { data, isLoading } = useFetchProductQuery();
  const [activeType, setActiveType] = useState<string>("All");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const products = useMemo(() => data ?? [], [data]);

  const typeFilters = useMemo(() => {
    const types = Array.from(new Set(products.map((product) => product.type))).sort((a, b) => a.localeCompare(b));
    return ["All", ...types];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = activeType === "All" ? products : products.filter((product) => product.type === activeType);

    const sorted = [...filtered];
    switch (sortOption) {
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        break;
    }

    return sorted;
  }, [activeType, products, sortOption]);

  if (isLoading) {
    return <LoadingState label="Discovering products" />;
  }

  if (!products.length) {
    return (
      <EmptyState title="No products found" description="Please check back later or adjust your filters." />
    );
  }

  return (
    <Stack spacing={5}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0.18) 100%)"
              : "linear-gradient(135deg, rgba(144,202,249,0.08) 0%, rgba(144,202,249,0.18) 100%)",
        }}
      >
        <Stack spacing={2} maxWidth={540}>
          <Typography variant="overline" color="primary" sx={{ letterSpacing: 1 }}>
            Discover new arrivals
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Find products tailored to your taste
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse curated selections across categories, brands, and price points. Add items to your basket instantly or
            deep dive into product details when you want to learn more.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
            <Button variant="contained" size="large">
              Shop featured picks
            </Button>
            <Button variant="text" size="large">
              View recent releases
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Box>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between" mb={3}>
          <Stack spacing={0.5}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Explore the catalog
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use quick filters to jump into categories that interest you most.
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }} flexWrap="wrap" useFlexGap>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {typeFilters.map((type) => {
                const isActive = activeType === type;
                return (
                  <Chip
                    key={type}
                    label={type}
                    clickable
                    color={isActive ? "primary" : undefined}
                    variant={isActive ? "filled" : "outlined"}
                    onClick={() => setActiveType(type)}
                  />
                );
              })}
            </Stack>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="catalog-sort-label">Sort by</InputLabel>
              <Select
                labelId="catalog-sort-label"
                label="Sort by"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                <MenuItem value="nameAsc">Name: A to Z</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 3 }} />
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <EmptyState
            title="No products match your filters"
            description="Try clearing some filters or exploring another category."
          />
        )}
        <Typography variant="caption" color="text.secondary" display="block" mt={3}>
          Showing {filteredProducts.length} of {products.length} products
        </Typography>
      </Box>
    </Stack>
  );
}
