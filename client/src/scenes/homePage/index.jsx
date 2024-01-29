import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const neutralMediumMain = theme.palette.neutral.mediumMain;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        height="93.6vh"
        padding="0.5rem 6% 0 6%"
        // When display is a big screen (i.e. non-mobile), widgets are placed
        // in row. Whereas on smaller screen (i.e. mobile), they will be
        // placed on top of each other (i.e. each widget will take up
        // a whole width on its own).
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="center"
        gap="2rem"
      >
        {/* 'flexBasis' sets the initial size of flex item along */}
        {/* the main axis. */}
        {/* '26% - Box component will initially occupy 26% of the */}
        {/*        available space along the main axis. */}
        {/* 'undefined - when undefined, the value is determined */}
        {/*              by other layout rules/defaults. */}

        {/* User Widget */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* Posts Widget */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* New Post */}
          <MyPostWidget picturePath={picturePath} />

          {/* Existing Posts */}
          <Box
            height="82.9%"
            mt={isNonMobileScreens ? undefined : "2rem"}
            sx={{
              overflowY: "auto", // enables scrolling within post column
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
            <PostsWidget userId={_id} isProfile={false} />
          </Box>
        </Box>

        {/* Advertisement Widget + Friends List Widget */}
        {isNonMobileScreens && (
          <Box
            height="100%"
            flexBasis="26%"
            sx={{
              overflowY: "auto", // enables scrolling within post column
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
            <AdvertWidget />

            <Box m="0.5rem 0" />

            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
