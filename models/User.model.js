const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Introduzca un nombre"],
      trim: true,
      minlength: [3, "El nombre debe tener mínimo tres letras"],
      // match
    },
    email: {
      type: String,
      required: [true, "Introduzca un email"],
      lowercase: true,
      trim: true,
      unique: [true, "Este email ya está registrado"],
      // match email válidos
    },
    password: {
      type: String,
      required: [true, "Introduzca una constraseña"],
      //match
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  currentFuel: {
    type: String,
    enum: ['Gasoleo A', 'Gasoleo Premium', 'Gasolina 95 E5', 'Gasolina 98 E5']
  }

},
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
User.syncIndexes()  // para que sincronice los cambios en la base de datos
module.exports = User
