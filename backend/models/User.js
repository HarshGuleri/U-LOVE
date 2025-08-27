const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PHOTO_SCHEMA = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const PREFERENCE_SCHEMA = new mongoose.Schema(
  {
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'other', 'any'], default: 'any' },
    ageMin: { type: Number, min: 18, default: 18 },
    ageMax: { type: Number, min: 18, default: 60 },
    distanceKm: { type: Number, min: 1, max: 500, default: 50 },
  },
  { _id: false }
);

const VERIFICATION_SCHEMA = new mongoose.Schema(
  {
    emailVerified: { type: Boolean, default: false },
    otpHash: { type: String, select: false },        // store hashed OTP if you must store it
    otpExpiresAt: { type: Date, select: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // auth
    name: { type: String, trim: true, minlength: 2, maxlength: 60 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // don’t return by default
    },

    // profile
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'other'], required: true },
    dateOfBirth: { type: Date, required: true }, // compute age from this
    bio: { type: String, trim: true, maxlength: 500 },
    interests: { type: [String], default: [], index: true },
    photos: { type: [PHOTO_SCHEMA], default: [] },

    // location (2dsphere for “nearby me”)
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },

    // preferences for matching
    preferences: { type: PREFERENCE_SCHEMA, default: () => ({}) },

    // account state / roles
    status: { type: String, enum: ['active', 'paused', 'banned'], default: 'active', index: true },
    role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },

    // verification & safety
    verification: { type: VERIFICATION_SCHEMA, default: () => ({}) },
    phone: { type: String, trim: true, sparse: true, unique: true }, // optional
    phoneVerified: { type: Boolean, default: false },

    // app meta
    lastActiveAt: { type: Date, default: Date.now, index: true },
    onboardingComplete: { type: Boolean, default: false },
    premium: {
      isActive: { type: Boolean, default: false },
      expiresAt: { type: Date },
    },

    // soft delete (optional)
    deletedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.verification?.otpHash;
        delete ret.verification?.otpExpiresAt;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// ---------- Indexes ----------
userSchema.index({ location: '2dsphere' }); // geo queries
userSchema.index({ interests: 1 });

// ---------- Virtuals ----------
userSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return undefined;
  const diff = Date.now() - this.dateOfBirth.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
});

// ---------- Hooks ----------
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ---------- Methods ----------
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Optional helper to set an OTP (hash it!)
userSchema.methods.setOTP = async function (otp, ttlMinutes = 10) {
  const hash = await bcrypt.hash(String(otp), 10);
  this.verification.otpHash = hash;
  this.verification.otpExpiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
};

userSchema.methods.verifyOTP = async function (otp) {
  const { otpHash, otpExpiresAt } = this.verification || {};
  if (!otpHash || !otpExpiresAt || otpExpiresAt < new Date()) return false;
  return bcrypt.compare(String(otp), otpHash);
};

// Hide soft-deleted users by default (optional global query helper)
userSchema.query.notDeleted = function () {
  return this.where({ deletedAt: { $exists: false } });
};

module.exports = mongoose.model('User', userSchema);
