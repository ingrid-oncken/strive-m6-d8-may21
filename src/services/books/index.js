import express from 'express'
import q2m from 'query-to-mongo'

import BookModel from './schema.js'

const booksRouter = express.Router()

booksRouter.get("/", async(req,res,next) => {
  try {
    const query = q2m(req.query)

    console.log(query)

    const total = await BookModel.countDocuments(query.criteria)
    const books = await BookModel.find(query.criteria, query.options.fields).limit(query.options.limit).skip(query.options.skip).sort(query.options.sort) // no matter how I write them, mongo is going to apply  ALWAYS sort skip limit in this order

    res.send({links: query.links("/books", total),total, books, pageTotal: Math.ceil(total/query.options.limit)})
  } catch (error) {
    next(error)
  }
})


export default booksRouter