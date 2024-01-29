import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // Get the 'userId' of the user of the profile page.
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const neutralMediumMain = theme.palette.neutral.mediumMain;

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-lint react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        // When display is a big screen (i.e. non-mobile), widgets are placed
        // in row. Whereas on smaller screen (i.e. mobile), they will be
        // placed on top of each other (i.e. each widget will take up
        // a whole width on its own).
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* User Widget */}
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          sx={{
            overflowY: "auto", // enables scrolling within post column
            maxHeight: "calc(100vh - 150px)",
            "::-webkit-scrollbar": {
              width: "9px",
            },
            // scrollbar will only be visible upon hover
            ":hover": {
              "::-webkit-scrollbar-track": {
                background: neutralLight,
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: neutralMediumMain,
                borderRadius: "20px",
                // border: "3px solid orange",
              },
            },
          }}
        >
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>

        {/* User's posts */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          sx={{
            overflowY: "auto", // enables scrolling within post column
            maxHeight: "calc(100vh - 150px)",
            "::-webkit-scrollbar": {
              width: "9px",
            },
            // scrollbar will only be visible upon hover
            ":hover": {
              "::-webkit-scrollbar-track": {
                background: neutralLight,
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: neutralMediumMain,
                borderRadius: "20px",
                // border: "3px solid orange",
              },
            },
          }}
        >
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
