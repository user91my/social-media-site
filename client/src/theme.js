// orange: {
//     50: "#ffe8dd",
//     100: "#ffe8dd",
//     200: "#ffd1bb",
//     300: "#ffba99",
//     400: "#ffa377",
//     500: "#ff8c55",
//     600: "#cc7044",
//     700: "#995433",
//     800: "#663822",
//     900: "#331c11"
// },

// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF", // white
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000", // black
  },
  primary: {
    // PINK
    50: "#f5e0eb",
    100: "#f5e0eb",
    200: "#ebc2d6",
    300: "#e0a3c2",
    400: "#d685ad",
    500: "#cc6699",
    600: "#a3527a",
    700: "#7a3d5c",
    800: "#52293d",
    900: "#29141f",
  },
  secondaryDark: {
    // RED PURPLE
    50: "#ebd6e0",
    100: "#ebd6e0",
    200: "#d6adc2",
    300: "#c285a3",
    400: "#ad5c85",
    500: "#993366",
    600: "#7a2952",
    700: "#5c1f3d",
    800: "#3d1429",
    900: "#1f0a14",
  },
  secondaryLight: {
    // RED PURPLE
    900: "#ebd6e0",
    800: "#ebd6e0",
    700: "#d6adc2",
    600: "#c285a3",
    500: "#ad5c85",
    400: "#993366",
    300: "#7a2952",
    200: "#5c1f3d",
    100: "#3d1429",
    50: "#1f0a14",
  },
};

// mui theme settings
// https://mui.com/material-ui/customization/palette/
export const themeSettings = (mode) => {
  return {
    // NOTE: Material-UI theme object have a number of properties
    //       that can be included (i.e. palette, typography, spacing,
    //       shape, components, etc.)
    palette: {
      mode: mode,
      // Ternary operator on palette selection (either dark or light mode)
      ...(mode === "dark"
        ? {
            // Palette values for dark mode
            primary: {
              ...colorTokens.primary,
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            secondary: {
              ...colorTokens.secondaryDark,
              main: colorTokens.secondaryDark[500],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // Palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            secondary: {
              ...colorTokens.secondaryLight,
              main: colorTokens.secondaryLight[500],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
      fontSize: 12,
      letterSpacing: "0.05rem",
      h1: {
        fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
        fontSize: 40,
        letterSpacing: "0.05rem",
      },
      h2: {
        fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
        fontSize: 32,
        letterSpacing: "0.05rem",
      },
      h3: {
        fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
        fontSize: 24,
        letterSpacing: "0.05rem",
      },
      h4: {
        fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
        fontSize: 20,
        letterSpacing: "0.05rem",
      },
      h5: {
        fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
        fontSize: 16,
        letterSpacing: "0.05rem",
      },
      h6: {
        fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
        fontSize: 14,
        letterSpacing: "0.05rem",
      },
    },
  };
};
