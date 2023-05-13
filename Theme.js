import React, { useState } from "react";
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#FFFFFF",
    text: "#333333",
  },
};

// TODO: Implement dark mode

export default theme;
