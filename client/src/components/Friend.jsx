import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// 'friendId' is the id of the user who made the specific post.
const Friend = ({ friendId, name, subtitle, userPicturePath, isProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Returns the first element (friend) that passes the specified ".find" test.
  // Returns 'undefined' if none pass.
  // 'friendId' is the 'postUserId'.
  // The specific test to be applied in 'friends.find' depends on whether the current page
  // is a Profile page ('isProfile' = true) OR a Home page ('isProfile' = false).
  const isFriend = isProfile
    ? friends.find((friend) => friend._id === _id)
    : friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      {/* Container for User Image + Name + Subtitle */}
      <FlexBetween gap="1rem">
        {/* User Image */}
        <UserImage image={userPicturePath} size="55px" />

        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // The purpose of 'navigate(0)' is to address a render bug. When going to
            // the next user page, 'navigate(0)' helps to manually refresh that page.
            // The link below describes the problem :-
            // https://youtu.be/K8YELRmUb5o?t=17030
            navigate(0);
          }}
        >
          {/* Name */}
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>

          {/* Subtitle, i.e. user's location */}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* Add / Remove Friend Icon Button */}
      {/* The button will ONLY APPEAR if the id of the logged-in user ('_id') */}
      {/* is not identical to the user's id who made the post ('friendId'). */}
      {_id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
