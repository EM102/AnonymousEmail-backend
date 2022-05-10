// import ClientModel from "../models/Client.js";
// import JWT from "jsonwebtoken";

// const createToken = (id) => {
//   return JWT.sign({ id }, "Elie");
// };
// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let error = { email: "", password: "" };

//   if (err.code === 11000) {
//     error.email = "that email is already in use";
//     return error;
//   }

//   if (err.message.includes("user validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       error[properties.path] = properties.message;
//     });
//   }
//   return error;
// };

// export const signup_get = (req, res) => {
//   res.json("signup");
// };
// export const login_get = (req, res) => {
//   res.json("login");
// };

// export const signup_post = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = await ClientModel.create({ username, email, password });
//     const token = createToken(user._id);
//     user.token = token;
//     console.log(token);
//     res.status(201).json({ user: user._id, token });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

// export const signin_post = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await ClientModel.login(email, password);
//     const token = createToken(user._id);
//     user.token = token;
//     console.log(token);
//     res.status(200).json({ user: user._id, token });
//   } catch (err) {
//     res.status(400).json({});
//   }
// };
