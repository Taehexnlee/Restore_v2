import { Box, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import LoadingState from "../../app/components/LoadingState";
import EmptyState from "../../app/components/EmptyState";
import OrderSummary from "../../app/shared/components/OrderSummary";
import { currencyFormat } from "../../lib/util";

export default function Basketpage() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) {
    return <LoadingState label="Loading your basket" />;
  }

  if (!data || data.items.length === 0) {
    return (
      <EmptyState
        title="Your basket is empty"
        description="Looks like you haven't added anything yet."
      >
        <Typography variant="body2" color="text.secondary">
          Head back to the catalog to discover products curated for you.
        </Typography>
      </EmptyState>
    );
  }

  const subtotal = data.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Stack spacing={4}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(46,125,50,0.05) 0%, rgba(46,125,50,0.16) 100%)"
              : "linear-gradient(135deg, rgba(165,214,167,0.1) 0%, rgba(165,214,167,0.2) 100%)",
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`${data.items.length} item${data.items.length > 1 ? "s" : ""}`} color="success" />
            <Chip label={`Subtotal ${currencyFormat(subtotal)}`} variant="outlined" />
            {subtotal >= 10000 && <Chip label="Free delivery unlocked" color="primary" variant="outlined" />}
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Your basket is ready to checkout
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={520}>
            Review your selected items, adjust quantities, and continue to secure checkout when you are ready. You can
            always come back to make changes.
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ borderRadius: 4, p: { xs: 2, md: 3 } }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Shopping Basket
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Make sure the quantities match what you need—updates are saved instantly.
                </Typography>
              </Box>
              <Divider />
              <Stack spacing={2}>
                {data.items.map((item) => (
                  <BasketItem key={item.productId} item={item} />
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 32 },
            }}
          >
            <OrderSummary />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
