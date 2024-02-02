import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginEmailError, setIsLoginEmailError] = useState(false);
  const [isLoginPasswordError, setIsLoginPasswordError] = useState(false);
  const [isRegisterEmailError, setIsRegisterEmailError] = useState(false);

  const registerSuccessNotification = () =>
    toast.success("Registration Successful!", {
      duration: 5000,
      position: "top-center",
      style: {
        background: `linear-gradient(
          180deg, 
          ${theme.palette.primary[500]}, 
          ${theme.palette.primary[800]}
        )`,
        color: theme.palette.neutral.dark,
      },
    });

  useEffect(() => {
    console.log("----");
    console.log(`isLoading = ${isLoading}`);
    console.log(`isLoginEmailError = ${isLoginEmailError}`);
    console.log(`isLoginPasswordError = ${isLoginPasswordError}`);
    console.log(`isRegisterEmailError = ${isRegisterEmailError}`);
  }, [
    isLoading,
    isLoginEmailError,
    isLoginPasswordError,
    isRegisterEmailError,
  ]);

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
        <Form
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isLoginEmailError={isLoginEmailError}
          setIsLoginEmailError={setIsLoginEmailError}
          isLoginPasswordError={isLoginPasswordError}
          setIsLoginPasswordError={setIsLoginPasswordError}
          isRegisterEmailError={isRegisterEmailError}
          setIsRegisterEmailError={setIsRegisterEmailError}
          registerSuccessNotification={registerSuccessNotification}
        />
      </Box>

      {/* TOASTER ELEMENT */}
      <Toaster />
      {/* <button onClick={registerSuccessNotification}>Success</button> */}
    </Box>
  );
};

export default LoginPage;
