import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

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

const RegisterLoginGroup = ({setOpen} : RegisterLoginProps) => {
  const navigate = useNavigate();
  const classes = useStyles();


  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/login");
            setOpen(false); // ✅ Closes the drawer
          }}
          className={classes.link}
        >
          <LoginIcon className={classes.menuIcon} />
          <ListItemText primary="Login" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/signup");
            setOpen(false); // ✅ Closes the drawer
          }}
          className={classes.link}
        >
          <AppRegistrationIcon className={classes.menuIcon} />
          <ListItemText primary="Register" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default RegisterLoginGroup;
