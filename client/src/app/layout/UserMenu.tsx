import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import type { MouseEvent } from "react";
import type { User } from "../model/user";
import { History, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
import { Link } from "react-router-dom";

type Props = {
  user: User;
};

export default function UserMenu({ user }: Props) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleClick} color="inherit" size="large" sx={{ fontSize: "1.1rem" }}>
        {user.email}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/orders'>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My orders</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
