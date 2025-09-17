import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { Product } from "../../product";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all .15s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardMedia
        sx={{
          height: 240,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {product.name}
        </Typography>

        <Typography variant="h6" color="secondary" sx={{ fontWeight: 600 }}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button component={Link} to={`/catalog/${product.id}`} size="small" variant="outlined">
          View
        </Button>
        <Button size="small" variant="contained">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}