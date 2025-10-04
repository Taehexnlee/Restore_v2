import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";

const midLink = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]
const rightLink = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]
const navStyle = {
  color: "inherit",
  typography: "subtitle1",
  textDecoration: "none",
  fontWeight: 600,
  px: 2,
  py: 1,
  borderRadius: 2,
  transition: "all .2s ease",
  '&:hover': {
    backgroundColor: "action.hover",
  },
  '&.active': {
    color: "primary.main",
    backgroundColor: "action.selected",
  },
};

export default function Navbar() {
  const {data: user} = useUserInfoQuery();
  const { isLoading, darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { data: basket } = useFetchBasketQuery();
  const itemCount = basket?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography component={NavLink} to="/" variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            RE-STORE
          </Typography>
          <IconButton onClick={() => dispatch(setDarkMode())} aria-label="Toggle theme mode" color="inherit">
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "#ffce45" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex", gap: 0.5 }} disablePadding>
          {midLink.map(({ title, path }) => (
            <ListItem
              key={path}
              component={NavLink}
              to={path}
              sx={navStyle}
              disablePadding
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
            aria-label="Basket"
          >
            <Badge badgeContent={itemCount} color="secondary" showZero>
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <List sx={{ display: "flex", gap: 0.5 }} disablePadding>
              {rightLink.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyle}
                  disablePadding
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>

          )}

        </Box>


      </Toolbar>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  )
}
