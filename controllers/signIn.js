import ClientModel from "../models/Client.js";
import JWT from "jsonwebtoken";

const createToken = (id) => {
  return JWT.sign({ id }, "Elie");
};

export const signin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await ClientModel.login(email, password);
    const token = createToken(user._id);
    user.token = token;
    console.log(token);
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    res.status(400).json({});
  }
};

// import joi from "joi";

// export const signIn = async (req, res) => {
//   const Schema = joi.object({
//     username: joi.string(),
//     password: joi.string(),
//     token: joi.string(),
//   });

//   const { error } = Schema.validate(req.body);

//   if (error) {
//     return res.status(400).send(error.details[0].message);
//   }

//   let user = await ClientModel.findOne({ email: req.body.email });

//   if (!user) {
//     return res.status(400).send("invalid credentials");
//   }

//   try {
//     await ClientModel.find(req.body.email && req.body.password);
//   } catch (err) {
//     console.log(err);
//   }
// };
