const { OnboardingKeys } = require("../../utils/enum");

const { Users } = require("../../models/user");

const CheckEmail = async (req) => {
    return await Users.findOne({email: req.body.email});
     
}
exports.CheckEmail = CheckEmail;