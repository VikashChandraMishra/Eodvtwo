const Report = require("../models/Report");
const User = require("../models/User");

const {
    ADMIN_USERNAME,
} = process.env;


exports.fetchEmployees = async (req, res) => {
    try {
        const employeesByBranch = {
            "Guwahati": [],
            "Delhi": [],
            "Chennai": [],
            "Mumbai": []
        }
        const branches = Object.keys(employeesByBranch);
        var employees;
        var highestEmployeeCount = 0;

        if (req.id == ADMIN_USERNAME) {
            employees = await User.find();

        } else {
            const user = await User.findById(req.id);

            if (!user || user.designation == 'employee') {
                return res.status(404).json({
                    success: false,
                    message: "action unauthorized"
                })

            } else if (user.designation == 'reporting manager') {
                employees = await User.find({ reportingManager: user.name });

            }
        }

        for (let x in branches) {
            let branch = branches[x];

            for (let i = 0; i < employees.length; i++) {
                if (employees[i].branch == branch) {
                    employeesByBranch[branch].push(employees[i].empID + " " + employees[i].name);
                }
            }

            if (employeesByBranch[branch].length > highestEmployeeCount) highestEmployeeCount = employeesByBranch[branch].length;
        }

        let i = 0;
        let formattedEmployeesByBranch = [];

        for (let i = 0; i < highestEmployeeCount; i++) {

            let row = {};
            for (let x in branches) {
                let branch = branches[x];

                if (!employeesByBranch[branch][i]) employeesByBranch[branch][i] = null;

                row[`${branch}`] = employeesByBranch[branch][i];
            }
            formattedEmployeesByBranch.push(row);
        }

        return res.json({
            success: true,
            message: "employees' list successfully fetched",
            employees: formattedEmployeesByBranch,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}


exports.submitEOD = async (req, res) => {
    try {
        const id = req.id;
        const {
            task
        } = req.body;

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        } else if (existingUser.designation == "employee" || existingUser.designation == "reporting manager") {

            if (existingUser.currentSubmission == "not done")
                existingUser.currentSubmission = "done";

            else if (existingUser.currentSubmission == "done") {
                return res.json({
                    success: false,
                    message: "Only one EOD can be submitted per day"
                })
            }

            await existingUser.save();

            await Report.create({
                empID: existingUser.empID,
                task: task
            });

            return res.json({
                success: true,
                message: "eod successfully submitted"
            });
        }

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Internal Server Error!");

    }

}


exports.fetchUserEods = async (req, res) => {
    try {
        const {
            begin,
            end
        } = req.body;

        const beginDate = new Date(begin);
        const endDate = new Date(end);
        const user = await User.findById(req.id);
        const eods = await Report.find({ "empID": user.empID, "date": { "$gte": beginDate, "$lt": endDate } });

        return res.json({
            success: true,
            message: "eods' list successfully fetched",
            eods: eods
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}


exports.fetchSubordinateEods = async (req, res) => {
    try {
        const {
            begin,
            end
        } = req.body;

        const beginDate = new Date(begin);
        const endDate = new Date(end);

        const eods = await Report.find({ "empID": req.header('empID'), "date": { "$gte": beginDate, "$lt": endDate } });

        return res.json({
            success: true,
            message: "eods' list successfully fetched",
            eods: eods
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}


exports.fetchEmployeesByLocation = async (req, res) => {
    try {
        const { location } = req.body;
        var employees;

        if (req.id == ADMIN_USERNAME) {
            employees = await User.find({ branch: location });

        } else if (req.id != ADMIN_USERNAME) {
            const user = await User.findById(req.id);

            if (!user) {
                return res.json({
                    success: false,
                    message: "user does not exist"
                });

            } else if (user.designation == 'employee') {
                return res.json({
                    success: false,
                    message: "unauthorized action"
                });

            }
            employees = await User.find({ reportingManager: user.name, branch: location });
        }

        return res.json({
            success: true,
            employees: employees,
            message: "employees' list successfully fetched"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}