import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ClientSchema = new mongoose.Schema({
  username: {type: String},
  email: {type: String, unique: true},
  password: {type: String},
  token: {type: String},
});

ClientSchema.post('save', function (doc, next) {
  console.log('new user was created and saved', doc);
  next();
});

ClientSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ClientSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const ClientModel = mongoose.model('clients', ClientSchema);
export default ClientModel;
