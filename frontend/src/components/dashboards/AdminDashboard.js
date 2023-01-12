import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionStatsPie from "../graphs/SubmissionStatsPie";
import EmployeesTable from "../tables/EmployeesTable";

const AdminDashboard = () => {

    const navigate = useNavigate(null);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <SubmissionStatsPie text="All Employees' EOD Submission Status" />
            </div>
            <div className="w-full md:w-1/2 p-2 md:p-6">
                <EmployeesTable />
            </div>
        </div>
    )
}

export default AdminDashboard;