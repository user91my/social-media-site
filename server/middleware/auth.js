import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Retrieves the "Authorization" header from the incoming request.
    // This header holds info such as a token or credentials.
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // Removes the "Bearer " string portion from the JWT string.
    // In the case of JWT, the "Authorization" header contains the
    // word "Bearer" followed by the JWT, which is composed of three parts:
    // the header, payload, and signature, separated by dots, e.g. :-
    //      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.[JWT Payload].[Signature]
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Decodes the token.
    // If the token is valid (i.e. hasn't expired and signature is valid),
    // the 'verified' variable will contain the decoded JWT payload.
    // If verification fails, it'll throw an error (which can be catched
    // via try-catch block).
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
