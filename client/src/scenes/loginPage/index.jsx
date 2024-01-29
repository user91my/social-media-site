import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      sx={{
        background: `linear-gradient(
            180deg, 
            ${theme.palette.secondary[500]},
            ${theme.palette.secondary[900]}
          )`,
      }}
    >
      {/* SITE LOGO */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Box fontFamily="Oswald, sans-serif" fontSize="32px" color={primary}>
          HubConnect
        </Box>
      </Box>

      {/* FORM BOX */}
      <Box
        width={isNonMobileScreens ? "475px" : "400px"}
        minWidth="300px"
        p="2.25rem 2rem"
        m="3rem 2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to HubConnect
        </Typography>

        {/* FORM */}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
