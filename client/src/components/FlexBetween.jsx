import { Box } from "@mui/material"; // 'Box' is a versatile container component
import { styled } from "@mui/system"; // 'styled' used to create styled components

// Creating a MUI styled component, the 'styled' syntax is as follows :-
//    `styled( muiComponent )( { cssProperties } )`
// 'FlexBetween' styled component inherits the properties and behaviour of 'Box'.
// Styles are defined for 'display', 'justifyContent' and 'alignItems'.
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
