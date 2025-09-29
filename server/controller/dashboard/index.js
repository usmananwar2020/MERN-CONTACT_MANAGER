const { getAllDashboardStats, getAllDataCount } = require("../../services/dashboard");
const { Success, Failuer } = require("../../utils/responseHandler");

const getDashboardStats = async (req, res) => {
    try{
        const stats = await getAllDashboardStats(req);
        const totalCount = await getAllDataCount(req);
        const data = {
            stats: stats,
            ...totalCount
        }
        Success(res, false, 'Retrive all stats successfully', data);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

exports.getDashboardStats = getDashboardStats;