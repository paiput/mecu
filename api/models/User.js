const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  passwordHash: { type: String, required: true }, 
  balance: { type: Number, default: 0 },
  likedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  purchasedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
},{ timestamps: true });

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = model('User', UserSchema);

module.exports = User;
