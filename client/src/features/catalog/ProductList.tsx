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
        gap={{ xs: 3, md: 3.5, lg: 4 }}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
          xl: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
        alignItems="stretch"
      >
        {products.map((product) => (
          <Box
            key={product.id}
            display="flex"
            sx={{
              height: "100%",
              transition: "transform 160ms ease, box-shadow 160ms ease",
              "&:hover": {
                transform: { sm: "translateY(-6px)" },
                boxShadow: "0 18px 48px rgba(15, 23, 42, 0.35)",
              },
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </>
  );
}