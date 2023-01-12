const Report = require("../models/Report");
const User = require("../models/User");

// Fetches profile data of employees
exports.fetchProfile = async (req, res) => {
    try {
        const employee = await User.findById(req.id);

        if (!employee) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        } else if (employee.designation == "reporting manager") {
            return res.json({
                success: false,
                message: "cannot fetch manager profile does not exist"
            });
        }

        return res.status(200).json({
            success: true,
            message: "user profile retrieved",
            user: employee
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error!");
    }
}


exports.fetchApprovalStats = async (req, res) => {
    try {
        var approved = 0;
        var rejected = 0;

        const user = await User.findById(req.id);

        if (!user) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        } else if (user.designation != "employee") {
            return res.json({
                success: false,
                message: "unauthorized action"
            });
        }

        eods = await Report.find({ "empID": user.empID });

        for (let i = 0; i < eods.length; i++) {
            if (eods[i].status == "approved") approved += 1;
            else if (eods[i].status == "rejected") rejected += 1;
        }

        const approvalPercentage = (approved * 100) / eods.length;
        const rejectionPercentage = (rejected * 100) / eods.length;

        return res.json({
            success: true,
            message: "status data fetched",
            data: { approvalPercentage: approvalPercentage, rejectionPercentage: rejectionPercentage }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}