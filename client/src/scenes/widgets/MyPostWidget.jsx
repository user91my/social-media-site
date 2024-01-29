import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  MicOutlined,
  MoreHorizOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();

  // Represents the switch as to whether if the user
  // has clicked on the image button to open up a
  // place to drop the image.
  const [isImage, setIsImage] = useState(false);

  // Represents the actual image if they actually
  // dropped it.
  const [image, setImage] = useState(null);

  // Represents the post's content.
  const [post, setPost] = useState("");

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper mb="0.5rem" mr="0.55rem">
      {/* User Image and Textbox Input */}
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.5rem 1.1rem",
          }}
        />
      </FlexBetween>

      {/* Image Dropzone */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false} // User can only only upload one file at a time.
            // The callback in 'onDrop' prop handles the file once the user drops it in.
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {/* Inside the Dropzone component, several props from Dropzone */}
            {/* are destructured (i.e. getRootProps, getInputProps etc.) as arguments. */}
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                {/* Image Box */}
                <Box
                  // The Box component receives the props returned by 'getRootProps()'.
                  // These props include event handlers for drag-and-drop functionality.
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {/* Input element receives props returned by 'getInputProps()'. */}
                  {/* This input element triggers the file selection dialog when clicked. */}
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {/* Delete button if image is actually dropped/loaded */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "0.75rem 0 0.45rem 0" }} />

      <FlexBetween justifyContent="space-around !important" p="5px 0">
        {/* Image icon and "Image" font */}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ cursor: "pointer", color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        <FlexBetween gap="0.25rem">
          <AttachFileOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Attachment</Typography>
        </FlexBetween>

        {/* Other Icons */}
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            height: "1.75rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
