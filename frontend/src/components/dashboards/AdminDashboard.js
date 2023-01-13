import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionStatsPie from "../graphs/SubmissionStatsPie";
import EmployeesList from "../tables/EmployeesList";

const AdminDashboard = () => {

    const navigate = useNavigate(null);

    useEffect(() => {
        if (localStorage.getItem('user') !== 'admin')
            navigate('/');
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <SubmissionStatsPie text="All Employees' EOD Submission Status" />
            </div>
            <div className="w-full md:w-1/2 p-2 md:p-6">
                <EmployeesList />
            </div>
        </div>
    )
}

export default AdminDashboard;