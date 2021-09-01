import mongoose from 'mongoose'

const {Schema, model} = mongoose

const userSchema = new Schema({
  name: { type: String, required: true},
  surname: { type: String, required: true},
  email: { type: String, required: true},
  age: {type: Number, min: 18, max: 65, required:true},
  dateOfBirth: {type: Date},
  professions: [String]
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
})

export default model("User", userSchema) // bounded to the "users" collection, if it is not there it is going to be created automatically