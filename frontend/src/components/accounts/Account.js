import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountEODTable from "../tables/AccountEODTable";

const Account = () => {

    const navigate = useNavigate(null);
    const addEOD = () => {
        navigate('/user/submit');
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="px-4">
                <h1 className="text-center my-2">EOD History</h1>
                <button className="w-28 md:w-48 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg text-xs md:text-base" onClick={addEOD}>Add New EOD</button>
            </div>
            <div className="w-1/2">
                <AccountEODTable />
            </div>
        </div>
    )
}

export default Account;