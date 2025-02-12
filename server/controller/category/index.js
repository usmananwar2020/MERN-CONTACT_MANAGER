const { Category } = require("../../models/category");
const { searchCategory, findCategoryById, deleteCategoryById,  } = require("../../services/category");
const { Failuer, Success } = require("../../utils/responseHandler");

const getAllCategory = async(req, res) => {
    try{
        const data =  await searchCategory(req);
        Success(res, false, 'Retrive all categories successfully', data);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }

}

const getIdBaseCategory = async(req, res) => {
    try{
        const data =  await findCategoryById(req);
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
        const cate =  await updateCategoryById(req);
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
        const cate =  await deleteCategoryById(req);
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