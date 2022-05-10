import jwt from 'jsonwebtoken';

const genAuthToken = user => {
  const secretKey = 'Elie';

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey,
  );
  return token;
};

export default genAuthToken;
