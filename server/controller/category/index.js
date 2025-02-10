const { Category } = require("../../models/category");
const { category404 } = require("../../services/category");

const getAllCategory = async(req, res) => {
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
}
const getIdBaseCategory = async(req, res) => {
    const data =  await Category.find({_id: req.params.id});
    if(!data){
        return category404(res);
    }
    res.send({
        message: 'Retrive all categories successfully',
        error: false,
        data
    })
}

const createNewCategory = async(req, res) => {

    const data = await new Category(req.body);
    data.save();
    res.send({
        message: 'Category created successfully',
        error: false,
        data
    })
}

const updateCategory = async(req, res) => {
    const cate =  await Category.findByIdAndUpdate(req.params.id,req.body,{new: true});
    if(!cate) {
        return category404(res);
    }

    res.send({
        message: 'Category updated successfully',
        error: false,
        data: cate
    })

}

const deleteCategory = async(req, res) => {
    const cate =  await Category.deleteOne({_id: req.params.id});
    if(cate?.deletedCount == 0){
        return category404(res)
    }

    res.send({
        message: 'Category deleted successfully',
        error: false,
        data: []
    })

}

exports.getAllCategory = getAllCategory
exports.createNewCategory = createNewCategory
exports.getIdBaseCategory = getIdBaseCategory
exports.updateCategory = updateCategory
exports.deleteCategory = deleteCategory