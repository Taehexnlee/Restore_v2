import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove, RemoveShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { useFetchProductDetailQuery } from "./catalogApi";
import { currencyFormat } from "../../lib/util";
import LoadingState from "../../app/components/LoadingState";
import EmptyState from "../../app/components/EmptyState";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/basketApi";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;
  const { data: product, isLoading } = useFetchProductDetailQuery(productId ?? skipToken);
  const { data: basket } = useFetchBasketQuery();
  const [addBasketItem, { isLoading: isAdding }] = useAddBasketItemMutation();
  const [removeBasketItem, { isLoading: isRemoving }] = useRemoveBasketItemMutation();
  const [quantity, setQuantity] = useState(1);

  const basketItem = useMemo(
    () => basket?.items.find((item) => item.productId === product?.id),
    [basket?.items, product?.id]
  );

  useEffect(() => {
    if (!product) return;
    if (basketItem) {
      setQuantity(basketItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [basketItem?.quantity, basketItem, product]);

  if (!productId) {
    return (
      <EmptyState
        title="Missing product"
        description="We need a product id to show details."
      />
    );
  }

  if (isLoading) {
    return <LoadingState label="Loading product" />;
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="We couldn't find the product you're looking for."
      />
    );
  }

  const handleChangeQuantity = (value: number) => {
    if (Number.isNaN(value)) {
      setQuantity(1);
      return;
    }

    const max = product.quantityInStock || value;
    const clamped = Math.max(1, Math.min(value, max));
    setQuantity(clamped);
  };

  const handleIncrement = () => {
    handleChangeQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    handleChangeQuantity(quantity - 1);
  };

  const handleAddToBasket = async () => {
    if (quantity <= 0) return;
    try {
      await addBasketItem({ product, quantity }).unwrap();
    } catch (error) {
      console.error("Failed to add item to basket", error);
    }
  };

  const handleRemoveFromBasket = async () => {
    if (!basketItem) return;
    const removalQuantity = Math.min(quantity, basketItem.quantity);
    if (removalQuantity <= 0) return;
    try {
      await removeBasketItem({ productId: product.id, quantity: removalQuantity }).unwrap();
    } catch (error) {
      console.error("Failed to remove item from basket", error);
    }
  };

  const productDetails = [
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in Stock", value: product.quantityInStock },
  ];

  const outOfStock = product.quantityInStock === 0;
  const canRemove = Boolean(basketItem && basketItem.quantity > 0);

  return (
    <Stack spacing={6} maxWidth="lg" sx={{ mx: "auto", width: "100%" }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              p: { xs: 2, md: 3 },
              backgroundColor: "background.paper",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={product.pictureUrl}
              alt={product.name}
              sx={{
                width: "100%",
                maxHeight: 520,
                objectFit: "contain",
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                <Chip label={product.brand} variant="outlined" color="primary" sx={{ textTransform: "uppercase" }} />
                <Chip label={product.type} variant="outlined" />
                {outOfStock && <Chip label="Out of stock" color="error" />}
              </Stack>
              <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.15 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" alignItems="baseline" spacing={2}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {currencyFormat(product.price)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.quantityInStock} in stock
              </Typography>
            </Stack>

            <Paper
              variant="outlined"
              sx={{
                borderRadius: 3,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Manage basket quantity
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton onClick={handleDecrement} disabled={quantity <= 1} size="small" color="primary">
                    <Remove />
                  </IconButton>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(event) => handleChangeQuantity(Number(event.target.value))}
                    inputProps={{ min: 1, max: product.quantityInStock, style: { textAlign: "center", width: 80 } }}
                    label="Quantity"
                    size="small"
                  />
                  <IconButton
                    onClick={handleIncrement}
                    disabled={outOfStock || (!!product.quantityInStock && quantity >= product.quantityInStock)}
                    size="small"
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {basketItem
                    ? `Currently ${basketItem.quantity} item${basketItem.quantity > 1 ? "s" : ""} in your basket.`
                    : "Not yet in your basket."}
                </Typography>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  onClick={handleAddToBasket}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartCheckout />}
                  disabled={outOfStock || isAdding}
                >
                  {isAdding ? "Adding..." : basketItem ? "Update basket" : "Add to basket"}
                </Button>
                <Button
                  onClick={handleRemoveFromBasket}
                  variant="outlined"
                  color="error"
                  size="large"
                  fullWidth
                  startIcon={<RemoveShoppingCart />}
                  disabled={!canRemove || isRemoving}
                >
                  {isRemoving ? "Removing..." : "Remove from basket"}
                </Button>
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Product details
              </Typography>
              <TableContainer>
                <Table size="small" sx={{ "& td": { border: "none", py: 1 } }}>
                  <TableBody>
                    {productDetails.map((detail) => (
                      <TableRow key={detail.label}>
                        <TableCell sx={{ fontWeight: 600, width: "35%" }}>{detail.label}</TableCell>
                        <TableCell>{detail.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
