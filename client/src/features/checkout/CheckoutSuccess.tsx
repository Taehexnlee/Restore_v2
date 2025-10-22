import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../app/model/order";
import { currencyFormat, formatAddressString, formatPaymentString, getStripeClientSecretFromSearch } from "../../lib/util";

export default function CheckoutSuccess() {
  const location = useLocation();
  const order = (location.state as { data?: Order } | null)?.data ?? null;
  const fallbackClientSecret = useMemo(
    () => getStripeClientSecretFromSearch(location.search),
    [location.search]
  );

  if(!order) {
    return (
      <Container maxWidth='md' sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>Problem accessing the order</Typography>
        {fallbackClientSecret ? (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            We detected a recent Stripe redirect. Try opening your orders list to confirm the payment status.
          </Typography>
        ) : null}
        <Button variant="contained" component={Link} to="/orders">
          View my orders
        </Button>
      </Container>
    )
  }


  
  return (
   <Container maxWidth='md'>
    <>
      <Typography variant="h4" gutterBottom fontWeight='bold'>
        Thanks for your fake order!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Your order <strong>#{order.id}</strong> will never be processed as this is a fake shop.
      </Typography>

      <Paper elevation={1} sx={{p:2, mb: 2, display: 'flex' , flexDirection: 'column', gap: 1.5}}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary">
              Order date
          </Typography>
          <Typography variant="body2" fontWeight='bold'>
              {order.orderDate}
          </Typography>
        </Box>
        <Divider /> 
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary">
              Payment method
          </Typography>
          <Typography variant="body2" fontWeight='bold'>
              {formatPaymentString(order.paymentSummary)}
          </Typography>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary">
              Shipping address
          </Typography>
          <Typography variant="body2" fontWeight='bold'>
              {formatAddressString(order.shippingAddress)}
          </Typography>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary">
              Amount
          </Typography>
          <Typography variant="body2" fontWeight='bold'>
              {currencyFormat(order.total)}
          </Typography>
        </Box>
      </Paper>
      <Box display='flex' justifyContent='flex-start' gap={2}>
        <Button variant="contained" color="primary" component = {Link} to ={`/orders/${order.id}`}>
          View your order
        </Button>
        <Button component ={ Link} to ='/catalog' variant="outlined" color="primary">
          Continue shopping
        </Button>
      </Box>
    </>
   </Container>
  )
}
