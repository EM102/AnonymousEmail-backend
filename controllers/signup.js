import ClientModel from "../models/Client";
import JWT from "jsonwebtoken";

const createToken = (id) => {
  return JWT.sign({ id }, "Elie");
};
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { email: "", password: "" };

  if (err.code === 11000) {
    error.email = "that email is already in use";
    return error;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

export const signup_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await ClientModel.create({ username, email, password });
    const token = createToken(user._id);
    user.token = token;
    console.log(token);
    res.status(201).json({ user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// import joi from "joi";
// import bcrypt from "bcrypt";
// import ClientModel from "../models/Client.js";
// import genAuthToken from "../utils/genAuthToken/genAuthToken.js";

// export const signUp = async (req, res) => {
//   const Schema = joi.object({
//     username: joi.string().required().min(5).max(25),
//     email: joi.string().required().email(),
//     password: joi.string().min(8).max(25).required(),
//     token: joi.string(),
//   });

//   const { error } = Schema.validate(req.body);
//   console.log("erorrrrrrrr", error);

//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   let user = await ClientModel.findOne({ email: req.body.email });

//   if (user) {
//     return res.status(400).send("user exists");
//   }

//   user = new ClientModel({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   const token = genAuthToken(user);

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   user = new ClientModel({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     token: token,
//   });

//   user = await user.save();

//   res.send(token);
// };
