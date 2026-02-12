const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Numele este obligatoriu'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'Prenumele este obligatoriu'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Numărul de telefon este obligatoriu'],
    trim: true,
    match: [/^07\d{8}$/, 'Număr de telefon invalid (trebuie să fie format românesc, ex: 07xxxxxxxx)']
  },
  password: {
    type: String,
    required: [true, 'Parola este obligatorie'],
    minlength: [4, 'Parola trebuie să aibă cel puțin 4 caractere']
  },
  address: {
    type: String,
    required: false,
    trim: true
  },
  whitelist: {
    type: Boolean,
    required: false,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    required: false
  },
  // Token-uri Expo Push pentru notificări (suportă mai multe dispozitive)
  pushTokens: {
    type: [String],
    required: false,
    default: []
  }
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = Buffer.from(this.password).toString('base64');
  }
  next();
});

userSchema.methods.verifyPassword = function(submittedPassword) {
  const codifiedPassword = Buffer.from(submittedPassword).toString('base64');
  return this.password === codifiedPassword;
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema); 