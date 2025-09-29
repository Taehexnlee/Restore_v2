import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import type { Item } from "../../app/model/basket";

type Props = {
  items: Item[];
};

export default function BasketSummary({ items }: Props) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0) / 100;

  return (
    <Paper sx={{ p: 3, position: "sticky", top: 112 }} elevation={1}>
      <Stack spacing={2}>
        <Typography variant="h6">Order Summary</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight={600}>${subtotal.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Shipping</Typography>
          <Typography textAlign="right" color="text.secondary">
            Calculated at checkout
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={600}>
            Estimated Total
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={700}>
            ${subtotal.toFixed(2)}
          </Typography>
        </Stack>
        <Button variant="contained" size="large" fullWidth disabled>
          Proceed to checkout
        </Button>
      </Stack>
    </Paper>
  );
}
