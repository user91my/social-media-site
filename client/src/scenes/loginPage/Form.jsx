import { useState } from "react";
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

const Form = ({
  isLoading,
  setIsLoading,
  isLoginEmailError,
  setIsLoginEmailError,
  isLoginPasswordError,
  setIsLoginPasswordError,
  isRegisterEmailError,
  setIsRegisterEmailError,
  registerSuccessNotification,
}) => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // REGISTER function
  // ------------------
  const register = async (values, onSubmitProps) => {
    // After "REGISTER" button is clicked, 'isLoading' is set to true.
    setIsLoading(true);

    // Creates a new javascript 'FormData' object.
    // It constructs a set of key/value pairs representing form fields and their values.
    // This also allows us to send files alongside the form (as if the encoding type
    // were set to "multipart/form-data").
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData();
    // Iterate through every Formik key-value field
    // (i.e. as defined in 'initialValuesRegister' object; firstName, lastName, etc.).
    for (let key in values) {
      formData.set(key, values[key]); // Add every Formik key-value into 'formData' object.
    }
    // Add another key-value field specifically for 'picturePath'.
    // The key is "picturePath" and value is the filename of the picture.
    formData.set("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: formData, // Sending 'formData' as the request body.
      }
    );
    const savedUser = await savedUserResponse.json(); // parses the response body (from server) into json format.

    // UNSUCCESSFUL user registration.
    // (due to email already exists in the server).
    // The response body contains an error 'msg' property.
    // See "server\controllers\auth.js".
    if (savedUser.msg) {
      console.log(savedUser); // registration error message

      // Create a plain object copy of formData ("formDataCopy").
      // The key-values of "formDataCopy" will be used to repopulate
      // the input fields in the registration page
      const formDataCopy = {};
      formData.forEach((value, key) => (formDataCopy[key] = value)); // Note: value and key is in reversed order in formData
      console.log("formDataCopy", formDataCopy);

      // Resets form BUT repopulates the input fields of the
      // registration page with the key-values of "formDataCopy".
      // HOWEVER, the "picture" field needs to be re-emptied so
      // as to prevent "net::ERR_UPLOAD_FILE_CHANGED" error on the browser.
      // https://formik.org/docs/migrating-v2#resetform
      onSubmitProps.resetForm({
        values: { ...formDataCopy, picture: "" },
      });

      setIsRegisterEmailError(true);
      setIsLoading(false);
      return;
    }

    // SUCCESSFUL user registration.
    // If user registration is SUCCESSFUL, reset page type to 'login'.
    if (savedUser) {
      setIsLoading(false);
      onSubmitProps.resetForm(); // Calling Formik's resetForm() function.
      setPageType("login");
      registerSuccessNotification();
    }
  };

  // LOGIN function
  // ------------------
  const login = async (values, onSubmitProps) => {
    // After "LOGIN" button is clicked, 'isLoading' is set to true.
    setIsLoading(true);

    // Fetching server payload from 'login' function in 'server\controllers\auth.js'.
    // If successful, the payload will be :-
    // { token , user }
    // If unsuccessful, the payload will either be :-
    // {msg: 'User does not exist.'}  OR  {msg: 'Invalid credentials.'}
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

    // UNSUCCESSFUL login.
    // (due to wrong email or password).
    // The response body contains an error 'msg' property.
    // See "server\controllers\auth.js".
    if (loggedIn.msg) {
      console.log(loggedIn); // login error message
      switch (loggedIn.msg) {
        case "User does not exist.": // wrong email
          setIsLoginEmailError(true);
          setIsLoginPasswordError(false);
          break;
        case "Invalid credentials.": // wrong password
          setIsLoginEmailError(false);
          setIsLoginPasswordError(true);
          break;
      }
      setIsLoading(false);
      return;
    }

    // SUCCESSFUL login.
    // If login response received, we call the 'setLogin' reducer
    // from the redux store in order to update the redux state.
    // See "client\src\state\index.js".
    if (loggedIn) {
      console.log("Login Successful!", loggedIn);

      dispatch(
        setLogin({
          // 'user' and 'token' values derived from the json response fetched from the server
          // (see 'login' function in 'server\controllers\auth.js').
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      setIsLoading(false);
      onSubmitProps.resetForm(); // Calling Formik's resetForm() function.
      navigate("/home");
    }
  };

  // HANDLEFORMSUBMIT function
  // --------------------------
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
            {/* REGISTRATION FIELDS */}
            {/* ------------------- */}
            {isRegister && (
              <>
                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Location */}
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

                {/* Occupation */}
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

                {/* PICTURE FIELD + DROPZONE */}
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

            {/* EMAIL + LOGIN FIELDS (FOR BOTH LOGIN & REGISTRATION) */}
            {/* ------------ */}
            {/* Email */}
            <Box sx={{ gridColumn: "span 4" }}>
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  if (isLoginEmailError) setIsLoginEmailError(false);
                  if (isRegisterEmailError) setIsRegisterEmailError(false);
                }}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  width: "100%",
                }}
              />
              {isLoginEmailError || isRegisterEmailError ? (
                <Box
                  width="max-content"
                  fontSize="0.75rem"
                  mt="3px"
                  ml="14px"
                  color="#f44336"
                >
                  {isLoginEmailError
                    ? "EMAIL DOESN'T EXIST"
                    : isRegisterEmailError
                    ? "EMAIL ALREADY EXIST"
                    : null}
                </Box>
              ) : null}
            </Box>

            {/* Password*/}
            <Box sx={{ gridColumn: "span 4" }}>
              <TextField
                label="Password"
                type="password" // type set to 'password' so its value is hidden.
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  if (isLoginPasswordError) setIsLoginPasswordError(false);
                }}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  width: "100%",
                }}
              />
              {isLoginPasswordError ? (
                <Box
                  width="max-content"
                  fontSize="0.75rem"
                  mt="3px"
                  ml="14px"
                  color="#f44336"
                >
                  INVALID PASSWORD
                </Box>
              ) : null}
            </Box>
          </Box>

          <Box>
            {/* LOGIN/REGISTER BUTTON */}
            <Button
              onClick={() =>
                console.log(
                  `${isLogin ? "LOGIN" : "REGISTER"} to server`,
                  values
                )
              }
              fullWidth
              disabled={isLoading ? true : false}
              type="submit"
              sx={{
                m: "2rem 0",
                p: "0.6rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              <Box position="relative" display="flex" alignItems="center">
                <Box>{isLogin ? "LOGIN" : "REGISTER"}</Box>
                {isLoading ? (
                  <Box
                    position="absolute"
                    left={isLogin ? "30px" : "45px"}
                    top="-8px"
                  >
                    {/* Loading image : https://loading.io/ */}
                    <img src="./assets/Rolling-1s-200px.svg" width="35px" />
                  </Box>
                ) : null}
              </Box>
            </Button>

            {/* "HAVE/DON'T HAVE ACCOUNT?" LINK */}
            <Typography
              onClick={() => {
                setIsLoginEmailError(false);
                setIsRegisterEmailError(false);
                setIsLoginPasswordError(false);
                resetForm();
                setPageType(isLogin ? "register" : "login");
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
