import express from 'express'
import createError from 'http-errors'

import UserModel from './schema.js'

const usersRouter = express.Router()

usersRouter.post("/", async(req,res,next) => {
  try {

    const newUser = new UserModel(req.body) // here happens validation of the req.body, if it's not ok mongoose will throw a "ValidationError"
    const {_id} = await newUser.save()

    res.status(201).send({_id})
    
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async(req,res,next) => {
  try {
    
    const users = await UserModel.find({})

    res.send(users)
    
  } catch (error) {
    next(error)
  }
})
usersRouter.get("/:userId", async(req,res,next) => {
  try {

    const userId = req.params.userId

    const user = await UserModel.findById(userId) // similar to findOne()

    if(user){

      res.send(user)

    } else {
      next(createError(404, `User with id ${userId} not found!`))
    }
    
  } catch (error) {
    next(error)
  }
})


usersRouter.put("/:userId", async(req,res,next) => {
  try {
    const userId = req.params.userId

    const modifiedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true // returns the modified user
    })

    if(modifiedUser){
      res.send(modifiedUser)
    } else {
      next(createError(404, `User with id ${userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})
usersRouter.delete("/:userId", async(req,res,next) => {
  try {
    const userId = req.params.userId

    const deletedUser = await UserModel.findByIdAndDelete(userId)

    if(deletedUser){
      res.status(204).send()
    } else {
      next(createError(404, `User with id ${userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})


export default usersRouter