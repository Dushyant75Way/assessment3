import { Button, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
  },
  activeLink: {
    backgroundColor: "#d0d0d0",
  },
  menuIcon: {
    marginRight: "10px",
  },
  logoutButton: {
    width: "100%",
    color: "red",
    marginTop: "20px",
  },
});

interface RegisterLoginProps {
  setOpen: (open: boolean) => void;
}

const AuthenticatedUserDisplay = ({ setOpen }: RegisterLoginProps) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Logs out user
    navigate("/login"); // Redirect to login page
    setOpen(false);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/");
            setOpen(false); // ✅ Closes the drawer
          }}
          className={classes.link}
        >
          <HomeIcon className={classes.menuIcon} />
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <Button
          variant="outlined"
          className={classes.logoutButton}
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </ListItem>
    </>
  );
};

export default AuthenticatedUserDisplay;
