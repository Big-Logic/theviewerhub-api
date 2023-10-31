const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const usersSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    middleName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      unique: [true, "An account with the same email alreay exist"],
      required: [true, "Email is required"],
      validate: {
        validator: function (el) {
          return isEmail(el);
        },
        message: "Plesase enter a valid email",
      },
    },
    birthDate: {
      type: Date,
      required: [true, "birthDate is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },
    password: {
      type: String,
      minLength: [8, "Password must be 8 characters long"],
      required: [true, "Password is required"],
      select: false,
    },
    userType: {
      type: String,
      enum: ["regular", "admin"],
      default: "regular",
    },

    profilePicture: {
      type: {
        publicId: {
          type: String,
          default: uuidv4(),
        },
        url: {
          type: String,
          default: "",
        },
      },
      default: {},
    },
    coverPicture: {
      type: {
        publicId: {
          type: String,
          default: uuidv4(),
        },
        url: {
          type: String,
          default: "",
        },
      },
      default: {},
    },
    location: {
      type: {
        country: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          default: "",
        },
        zipCode: {
          type: Number,
          default: null,
        },
      },
      default: {},
    },
    bio: {
      type: String,
      default: "",
    },
    social: {
      type: {
        facebook: {
          type: String,
          default: "",
        },
        github: {
          type: String,
          default: "",
        },
        linkedIn: {
          type: String,
          default: "",
        },
        twitter: {
          type: String,
          default: "",
        },
      },
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

usersSchema.methods.comparePassword = async function (
  password,
  storedPassword
) {
  return await bcrypt.compare(password, storedPassword);
};

module.exports = model("User", usersSchema);
