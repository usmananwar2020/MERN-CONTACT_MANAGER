const { Category } = require("../../models/category");
const { category404 } = require("../../services/category");
const { Failuer, Success } = require("../../utils/responseHandler");

const getAllCategory = async(req, res) => {
    try{
        const searchParams = req.query;
        const query = {}
        if(searchParams.search){
            query.$or = [
                {category: { $regex: new RegExp(searchParams.search, 'i') }},
            ]
        }
        const data =  await Category.find(query);
        Success(res, false, 'Retrive all categories successfully', data);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }

}
const getIdBaseCategory = async(req, res) => {
    try{
        const data =  await Category.find({_id: req.params.id});
        if(!data){
            return Failuer(res, true, 400, 'Category doesnot exist', [])
        }
        Success(res, false, 'Retrive all categories successfully', data);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

const createNewCategory = async(req, res) => {
    try{
        const data = await new Category(req.body);
        data.save();
        Success(res, false, 'Category created successfully', data);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }

}

const updateCategory = async(req, res) => {
    try{
        const cate =  await Category.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!cate) {
            return Failuer(res, true, 400, 'Category doesnot exist', [])
        }
        Success(res, false, 'Category updated successfully', cate);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }

}

const deleteCategory = async(req, res) => {
    try{
        const cate =  await Category.deleteOne({_id: req.params.id});
        if(cate?.deletedCount == 0){
            return Failuer(res, true, 400, 'Category doesnot exist', [])
        }
        Success(res, false, 'Category deleted successfully', []);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

exports.getAllCategory = getAllCategory
exports.createNewCategory = createNewCategory
exports.getIdBaseCategory = getIdBaseCategory
exports.updateCategory = updateCategory
exports.deleteCategory = deleteCategory