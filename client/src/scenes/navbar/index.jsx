import { useState } from "react";
// importing MUI components and its APIs
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// importing MUI icons
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material";
// 'useSelector' - access and retieve data from the Redux store
// 'useDispatch' - used for dispatching actions to the Redux store
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import hexToRgba from "hex-to-rgba";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // retrieve 'state.user' from Redux store
  const user = useSelector((state) => state.user);

  // Determine if a user's current screen size is below OR higher
  // than 1000px.
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  // useTheme() allows us to access themes defined in 'client\src\theme.js'.
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // NOTE!!!!
  // PLEASE CHANGE 'fullName' TO INTERPOLATED VERSION ONCE AUTHENTICATION IS COMPLETED.
  // We're using 'fake user' as a temporary placeholder.
  const fullName = `${user.firstName} ${user.lastName}`;
  // const fullName = `fake user`;

  return (
    <FlexBetween padding="0.4rem 6%" backgroundColor={alt}>
      <FlexBetween gap="2rem">
        {/* SITE LOGO */}
        <Typography
          fontFamily="Oswald, sans-serif"
          // "clamp(minFontValue , preferredFontValue, maxFontValue)"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={primary}
          onClick={() => navigate("/home")}
          // The 'sx' prop is a convenient way to apply custom inline styles.
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          HubConnect
        </Typography>

        {/* SEARCH BAR + SEARCH LOGO*/}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            height="2.2rem"
            overflow="hidden"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* Dark/Light Mode Button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          {/* Message Button */}
          <Message sx={{ fontSize: "25px" }} />

          {/* Notification Button */}
          <Notifications sx={{ fontSize: "25px" }} />

          {/* Drop-Down Menu & its Menu Items */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        // Menu Button in Mobile Mode
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} // clicking the overlay (other than the navbar) will close the navbar
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          minWidth="225px"
          width="1200px"
          backgroundColor={hexToRgba(background, 0.2)}
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <Box
            onClick={(event) => event.stopPropagation()} // prevents propagation to the parent
            position="absolute"
            right="0"
            width="30vw"
            minWidth="190px"
            height="100%"
            boxShadow={`0 0 25px 5px ${theme.palette.neutral.mediumMain}`}
            backgroundColor={hexToRgba(background, 1)}
          >
            {/* Close Button */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS IN MOBILE MODE */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              {/* Dark/Light Mode Button */}
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              {/* Message Button */}
              <Message sx={{ fontSize: "25px" }} />
              {/* Notification Button */}
              <Notifications sx={{ fontSize: "25px" }} />

              {/* Drop-Down Menu & its Menu Items */}
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
