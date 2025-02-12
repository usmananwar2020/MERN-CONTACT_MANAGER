const { Category } = require("../../models/category");

const searchCategory = (req) => {
    const searchParams = req.query;
        const query = {}
        if(searchParams.search){
            query.$or = [
                {category: { $regex: new RegExp(searchParams.search, 'i') }},
            ]
        }
        return Category.find(query);
}

const findCategoryById = (req) => {
    return Category.find({_id: req.params.id});
}
const updateCategoryById = (req) => {
    return Category.findByIdAndUpdate(req.params.id,req.body,{new: true});
}
const deleteCategoryById = () => {
    return Category.deleteOne({_id: req.params.id})
}

exports.findCategoryById = findCategoryById;
exports.searchCategory = searchCategory;
exports.updateCategoryById = updateCategoryById;
exports.deleteCategoryById = deleteCategoryById;