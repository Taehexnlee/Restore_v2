import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import type { Product } from "../../product";
import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();
  return (
    <Card
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        transition: "all .2s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardMedia
        sx={{
          pt: "75%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Chip label={product.brand} size="small" color="primary" variant="outlined" sx={{ textTransform: "uppercase" }} />
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
            {product.type}
          </Typography>
        </Stack>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="baseline" mt="auto">
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {product.quantityInStock} in stock
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button component={Link} to={`/catalog/${product.id}`} size="small" variant="outlined">
          View details
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => addBasketItem({ product, quantity: 1 })}
          size="small"
          variant="contained"
        >
          {isLoading ? "Adding" : "Add to cart"}
        </Button>
      </CardActions>
    </Card>
  );
}
