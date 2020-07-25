var user_model = require("../model/user_model");
module.exports = async (req, res, next) => {
    try {
        if (req.params.token) {
            const adminToken = req.params.token
            const admin = await user_model.findOne({ where: { token: adminToken } })
            if (admin){
                req.user = admin
               }
               else return res.send({'msg':"kindly login first"})  
        }
        else return res.send("kindly login first")
        next();
    }
    catch (err) {
        console.log(err.message);
        res.send("kindly login first")
    }
}