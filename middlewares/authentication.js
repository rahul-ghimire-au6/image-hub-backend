var user_model = require("../model/user_model");
module.exports = async (req, res, next) => {
    try {
        if (req.header("Authorization")) {
            const adminToken = req.header("Authorization")
            const admin = await user_model.findOne({ where: { token: adminToken } })
            if (admin){
                req.user = admin
               }
               else return res.send("kindly login first")  
        }
        else return res.send("kindly login first")
        next();
    }
    catch (err) {
        console.log(err.message);
        res.send("kindly login first")
    }
}