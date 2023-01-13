const User = require("../models/User");


exports.register = async (req, res) => {
    try {
        let {
            username,
            password,
            name,
            empID,
            gender,
            mobile,
            email,
            designation,
            reportingManagerID,
            branch
        } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username: username }, { empID: empID }, { mobile: mobile }, { email: email }]
        });

        if (existingUser) {
            return res.json({
                success: false,
                message: "user already exists"
            });

        } else {
            if (designation == "reporting manager" && reportingManagerID != 0) {
                return res.json({
                    success: false,
                    message: "reporting manager cannot be assigned a reporting manager"
                });

            } else if (designation == "reporting manager" && reportingManagerID == 0) {
                reportingManagerID = null;

            } else {
                var reportingManager = await User.findOne({ "empID": reportingManagerID });

                if (reportingManager) {
                    if (reportingManager.designation == "employee") {
              
                        return res.json({
                            success: false,
                            message: "an employee cannot be a reporting manager"
                        });

                    } else {
                     
                        reportingManager = reportingManager.name;
                    }

                } else {
                    return res.json({
                        success: false,
                        message: "reporting manager with the given ID does not exist"
                    });

                } 
            }

            await User.create({
                username: username,
                password: password,
                name: name,
                empID: empID,
                gender: gender,
                mobile: mobile,
                email: email,
                designation: designation,
                reportingManager: reportingManager,
                branch: branch
            });

        }

        return res.json({
            success: true,
            message: "user successfully registered"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}

exports.fetchSubmissionStats = async (req, res) => {
    try {
        var employees = [];
        var submitted = 0;
        var notSubmitted = 0;

        if (req.id == "admin") {
            employees = await User.find();

            for (let i = 0; i < employees.length; i++) {
                if (employees[i].currentSubmission == "done") submitted += 1;
                else if (employees[i].currentSubmission == "not done") notSubmitted += 1;
            }

        }

        const submissionPercentage = Math.round(((submitted * 100) / employees.length) * 100) / 100;
        const nonSubmissionPercentage = Math.round(((notSubmitted * 100) / employees.length) * 100) / 100;

        return res.json({
            success: true,
            message: "submission data fetched",
            data: { submissionPercentage: submissionPercentage, nonSubmissionPercentage: nonSubmissionPercentage }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}