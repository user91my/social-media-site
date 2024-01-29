import { Box } from "@mui/material"; // 'Box' is a versatile container component
import { styled } from "@mui/system"; // 'styled' used to create styled components

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem 1.5rem 0.6rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
