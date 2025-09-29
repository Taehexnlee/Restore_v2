import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import type { Item } from "../../app/model/basket";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
    item: Item
}
export default function BasketItem({ item }: Props) {
    const [removeBasketItem] = useRemoveBasketItemMutation();
    const [addBasketItem] = useAddBasketItemMutation();
    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 3,
                p: { xs: 2, md: 3 },
                borderColor: "divider",
                backgroundColor: "background.paper",
            }}
        >
            <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                <Box
                    component='img'
                    src={item.pictureUrl}
                    alt={item.name}
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 2,
                    }}
                />
                <Box display="flex" flexDirection="column" gap={1} minWidth={200}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.brand} • {item.type}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                        <Typography color="text.secondary" sx={{ fontSize: "1.05rem" }}>
                            {currencyFormat(item.price)} x {item.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: "1.1rem" }} color="primary" fontWeight={600}>
                            {currencyFormat(item.price * item.quantity)}
                        </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <IconButton onClick={() => removeBasketItem({ productId: item.productId, quantity: 1 })} color="error" size="small" sx={{ border: 1, borderRadius: 2 }} aria-label="Decrease quantity">
                            <Remove />
                        </IconButton>
                        <Typography variant="h6">{item.quantity}</Typography>
                        <IconButton onClick={() => addBasketItem({ product: item, quantity: 1 })} color="success" size="small" sx={{ border: 1, borderRadius: 2 }} aria-label="Increase quantity">
                            <Add />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>
            <IconButton
                onClick={() => removeBasketItem({ productId: item.productId, quantity: item.quantity })}
                color="error"
                size="small"
                sx={{ border: 1, borderRadius: 2, alignSelf: 'flex-start' }}
                aria-label="Remove item"
            >
                <Delete />
            </IconButton>
        </Paper>
    )
}
