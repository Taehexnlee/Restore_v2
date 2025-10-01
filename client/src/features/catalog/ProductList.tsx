import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import type { Product } from "../../product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  isLoading?: boolean;
};

export default function ProductList({ products, isLoading }: Props) {
  return (
    <>
      {isLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress color="secondary" size={32} />
        </Box>
      )}
      <Box
        display="grid"
        gap={{ xs: 2.5, md: 3 }}
        gridTemplateColumns={{
          xs: "repeat( auto-fit, minmax(240px, 1fr) )",
          sm: "repeat( auto-fit, minmax(260px, 1fr) )",
          lg: "repeat( auto-fit, minmax(280px, 1fr) )",
        }}
      >
        {products.map((product) => (
          <Box key={product.id} display="flex" sx={{ height: "100%" }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </>
  );
}
