const blog = require('express').Router()
const Blog = require('../models/blog.js')

// I.N.D.U.C.E.S. //
// Index Route //
blog.get('/', (req, res) => {
  Blog.find({}, (err, foundBlog) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundBlog)
  })
})

// New Route //


// Delete Route //
blog.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedBlog)
  })
})

// Update Route //
blog.put('/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedBlog) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedBlog)
  })
})

// Create Route //
blog.post('/', (req, res)=> {
    Blog.create(req.body, (error, createdBlog)=>{
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).send(createdBlog)
    })
})

// Edit Route //

// Show Route //

module.exports = blog
