const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Category, Validate} = require('../models/category');


// Get categories
router.get('/', auth, async(req, res) => {
    const searchParams = req.query;
    const query = {}
    if(searchParams.search){
        query.$or = [
            {category: { $regex: new RegExp(searchParams.search, 'i') }},
        ]
    }
    const data =  await Category.find(query);
    res.send({
        message: 'Retrive all categories successfully',
        error: false,
        data
    })
})

// Get category by Id
router.get('/:id', auth, async(req, res) => {

    const data =  await Category.find({_id: req.params.id});
    if(!data){
        return res.status(404).send({
            message: 'Category doesnot exist',
            error: false,
            data
        })
    }
    res.send({
        message: 'Retrive all categories successfully',
        error: false,
        data
    })
})

// Create category
router.post('/', [auth, admin], async(req, res) => {
    const {error} = Validate(req.body);
    if(error){
        res.status(400).send({
            message: error?.details[0]?.message,
            error: true,
            date: []
        })
    }
    const data = await new Category(req.body);
    data.save();
    res.send({
        message: 'Category created successfully',
        error: false,
        data
    })
})

//Update category
router.put('/:id', [auth, admin], async(req, res) => {
    const cate =  await Category.findByIdAndUpdate(req.params.id,req.body,{new: true});
    if(!cate){
        return res.status(404).send({
            message: 'Category doesnot exist',
            error: true,
            data: cate
        })
    }

    res.send({
        message: 'Category updated successfully',
        error: false,
        data: cate
    })

})
//Delete category
router.delete('/:id', [auth, admin], async(req, res) => {
    const cate =  await Category.deleteOne({_id: req.params.id});
    if(cate?.deletedCount == 0){
        return res.status(404).send({
            message: 'Category doesnot exist',
            error: true,
            data: []
        })
    }

    res.send({
        message: 'Category deleted successfully',
        error: false,
        data: []
    })

})

module.exports = router;
