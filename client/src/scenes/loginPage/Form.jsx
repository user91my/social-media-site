import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// Formik is a react form library.
import { Formik } from "formik";
// yup is a schema builder for runtime value parsing and validation.
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// yup register schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// yup login schema
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "email1@email.com",
  password: "password123",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // Creates a new javascript 'FormData' object.
    // It constructs a set of key/value pairs representing form fields and their values.
    // This also allows us to send files alongside the form (as if the encoding type
    // were set to "multipart/form-data").
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData();
    // Iterate through every Formik key-value field
    // (i.e. as defined in 'initialValuesRegister' object; firstName, lastName, etc.).
    for (let key in values) {
      formData.append(key, values[key]); // Add every Formik key-value into 'formData' object.
    }
    // Add another key-value field specifically for 'picturePath'.
    // The key is "picturePath" and value is the filename of the picture.
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: formData, // Sending 'formData' as the request body.
      }
    );
    const savedUser = await savedUserResponse.json(); // parses the response body (from server) into json format.
    onSubmitProps.resetForm(); // Calling Formik's resetForm() function.

    // If user successfully registered, reset page type to 'login'.
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    // Fetching server payload from 'login' function in 'server\controllers\auth.js'.
    const loggedInResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Telling the server that we're sending JSON data in the request body.

        // The 'values' object (containing Formik form input data) is sent to the server as
        // the request body. It is necessary to convert the 'values' object into JSON-formatted
        // string because the "Content-Type" header is set to "application/json".
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json(); // parses the response body (from server) into json format.
    onSubmitProps.resetForm();

    // If login to server successful, we call the 'setLogin' reducer
    // from the redux store in 'client\src\state\index.js' in order to
    // update the redux state (also in 'client\src\state\index.js').
    if (loggedIn) {
      // Using Redux's dispatch function in order to call the 'setLogin' reducer.
      dispatch(
        setLogin({
          // 'user' and 'token' values derived from the json response fetched from the server
          // (see 'login' function in 'server\controllers\auth.js').
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      // Changes to 'isLogin' will change the 'key' prop.
      // This will force React to recreate the 'Formik' component and therefore
      // reset Formik's 'initialValues' and 'validationSchema' props.
      // See also formik's 'enableReinitialize' prop.
      key={isLogin ? "login" : "register"}
      // The initial values defined ('initialValuesLogin' & 'initialValuesRegister')
      // will be passed on to Formik's 'values' prop. The "initialValues" prop also
      // determines which form fields will display the error helperText whenever
      // any of the specific fields isn't filled properly (e.g. left blank).
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      // Upon clicking the LOGIN/REGISTER button,
      // the form would only be submitted if either the loginSchema is complied
      // (when in login page) or the registerSchema is complied (when in register
      // page).
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* Inside the Formik component, several props from Formik */}
      {/* are destructured (i.e. values, errors, etc.) as arguments. */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            // Splits grid into 4 columns with a minimum of 0
            // and a max of 4 equal fractions (see css grid).
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              // Targets all <div> child components.
              // If 'isNonMobile' is false (i.e. is mobile), the div components will
              // span 4 columns in the css grid layout.
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Registration Page */}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur} // handles situation when clicking out of an input (i.e. input field loses focus).
                  onChange={handleChange} // handles situation when typing.
                  value={values.firstName}
                  name="firstName" // the name attribute should match the keys defined in 'initialValuesRegister' object.
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName) // a boolean indicating whether there is an error for this field.
                  }
                  // When 'error' is true, the error message is displayed in the 'helperText' area.
                  // The error message is gotten from the yup schemas of 'registerSchema' and 'loginSchema'.
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur} // handles situation when clicking out of an input
                  onChange={handleChange} // handles situation when typing
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur} // handles situation when clicking out of an input
                  onChange={handleChange} // handles situation when typing
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur} // handles situation when clicking out of an input
                  onChange={handleChange} // handles situation when typing
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                  borderColor={
                    Boolean(touched.picture) && Boolean(errors.picture)
                      ? "#f44336"
                      : undefined
                  }
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false} // User can only only upload one file at a time.
                    // The callback in 'onDrop' prop handles the file once the user drops it in.
                    onDrop={(acceptedFiles) =>
                      // Sets the value of 'picture' field to the first accepted file.
                      // ( i.e. name="picture" value={acceptedFiles[0]} )
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {/* Inside the Dropzone component, several props from Dropzone */}
                    {/* are destructured (i.e. getRootProps, getInputProps etc.) as arguments. */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        // The Box component receives the props returned by 'getRootProps()'.
                        // These props include event handlers for drag-and-drop functionality.
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        borderColor={
                          Boolean(touched.picture) && Boolean(errors.picture)
                            ? "#f44336"
                            : undefined
                        }
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        {/* Input element receives props returned by 'getInputProps()'. */}
                        {/* This input element triggers the file selection dialog when clicked. */}
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                  {Boolean(touched.picture) && Boolean(errors.picture) && (
                    <Typography color="error" fontSize="11px" mt="0.75rem">
                      {errors.picture}
                    </Typography>
                  )}
                </Box>
              </>
            )}

            {/* Email & Password Fields */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password" // type set to 'password' so its value is hidden.
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            {/* LOGIN/REGISTER BUTTON */}
            <Button
              onClick={() => console.log(values)}
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            {/* Signup / Login Message Link */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
