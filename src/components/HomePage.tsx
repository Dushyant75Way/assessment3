import React from "react";
import Lottie from "lottie-react";
import HomePage from "../assets/HomePage.json";
import { Box, Typography } from "@mui/material";

const HomePageScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    //   alignItems="center"
      height="100%"
    >
      <Lottie
        animationData={HomePage}
        loop={true}
        style={{ width: 1500, height: 900 }}
      />
    </Box>
  );
};

export default HomePageScreen;
