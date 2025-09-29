import { Badge, Box, Button, Divider, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { useFetchBasketQuery } from "../../../features/basket/basketApi";
import type { Item } from "../../model/basket";
import { Link } from "react-router-dom";

export default function OrderSummary() {
    const { data: basket } = useFetchBasketQuery();
    const subtotal = basket?.items.reduce((sum: number, item: Item) => sum + item.quantity * item.price, 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;
    const savings = deliveryFee === 0 ? 500 : 0;

    return (
        <Stack spacing={3}>
            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 4,
                    p: 3,
                    background: (theme) =>
                        theme.palette.mode === "light"
                            ? "linear-gradient(160deg, rgba(25,118,210,0.06) 0%, rgba(25,118,210,0.14) 100%)"
                            : "linear-gradient(160deg, rgba(144,202,249,0.12) 0%, rgba(144,202,249,0.16) 100%)",
                }}
            >
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Order summary
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Orders over $100 enjoy free delivery and exclusive perks.
                        </Typography>
                    </Box>

                    <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography color="text.secondary">Subtotal</Typography>
                            <Typography>{currencyFormat(subtotal)}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography color="text.secondary">Savings</Typography>
                            <Typography color={savings > 0 ? "success.main" : "text.secondary"}>
                                -{currencyFormat(savings)}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography color="text.secondary">Delivery fee</Typography>
                            <Typography>{currencyFormat(deliveryFee)}</Typography>
                        </Stack>
                    </Stack>

                    <Divider />

                    <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                        <Typography variant="subtitle1" color="text.secondary">
                            Total due
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {currencyFormat(subtotal + deliveryFee)}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Button
                            component={Link}
                            to="/checkout"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Proceed to checkout
                        </Button>
                        <Typography variant="caption" color="text.secondary" textAlign="center">
                            Secure checkout • Free returns within 30 days
                        </Typography>
                        <Button component={Link} to="/catalog" fullWidth>
                            Continue shopping
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ borderRadius: 4, p: 3 }}>
                <Stack spacing={2} component="form">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Have a promo code?
                        </Typography>
                        <Badge
                            color="success"
                            badgeContent="NEW"
                            sx={{ "& .MuiBadge-badge": { right: -18, top: 8 } }}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        Enter your code below to unlock additional savings at checkout.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField label="Promo code" variant="outlined" fullWidth size="small" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ height: "100%" }}>
                                Apply
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ borderRadius: 4, p: 3 }}>
                <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                        Why shop with us?
                    </Typography>
                    <Stack spacing={0.5}>
                        <Typography variant="body2">• 2-day delivery on most items</Typography>
                        <Typography variant="body2">• 30-day hassle-free returns</Typography>
                        <Typography variant="body2">• Secure payment with leading providers</Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    )
}
