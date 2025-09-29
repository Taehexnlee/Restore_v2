import { Grid } from "@mui/material";
import type { Product } from "../../product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} display="flex">
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
