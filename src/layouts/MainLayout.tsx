import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import RegisterLoginGroup from "../components/RegisterLoginGroup";
import AuthenticatedUserDisplay from "../components/AuthenticatedUserDisplay";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#1976d2",
    zIndex: 1300,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    marginTop: "64px",
  },
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
});

const MainLayout = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <ListItemButton
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Online Quiz System
          </ListItemButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="persistent" // 👈 Keeps drawer open properly
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          {user?.role === "admin" && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/admin");
                  setOpen(false);
                }}
                className={classes.link}
              >
                <AdminPanelSettingsIcon className={classes.menuIcon} />
                <ListItemText primary="Admin Panel" />
              </ListItemButton>
            </ListItem>
          )}
          {!user ? (
            <RegisterLoginGroup setOpen={setOpen} />
          ) : (
            <AuthenticatedUserDisplay setOpen={setOpen} />
          )}
        </List>
      </Drawer>

      {/* 🛠️ Fix: Adjust main layout */}
      <main
        className={classes.content}
        style={{
          marginLeft: open ? 240 : 0, // Adjust when drawer is open
          transition: "margin 0.3s ease-out",
          width: open ? "calc(100% - 240px)" : "100%",
          padding: "20px",
          marginTop: "64px", // Push below AppBar
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
