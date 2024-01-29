import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        // css attribute 'objectFit' set to 'cover' instructs the browser
        // to scale an image to cover the entire container while maintaining
        // its aspect ratio :-
        // https://www.w3schools.com/css/css3_object-fit.asp
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
