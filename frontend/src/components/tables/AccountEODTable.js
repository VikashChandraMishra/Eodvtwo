import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountTableRow from "./table-components/AccountTableRow";

const AccountEODTable = () => {

    const navigate = useNavigate(null);
    const [eods, setEods] = useState([]);
    const [dateRange, setDateRange] = useState({ "begin": "", "end": "" });

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/common/fetch-user-eods', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                    body: JSON.stringify(dateRange)
                }
            })

            const json = await response.json();

            if (json.success) {
                setEods(json.eods);
            } else alert("Cannot fetch eods' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    }


    return (
        <div className="overflow-auto h-full">


            
            {/* <div className="my-3 flex flex-row justify-around text-xs md:text-base text-gray-600">
                <span>Search:</span>
                <input type="date" id="begin" name="begin" value={dateRange.begin} onChange={onChange} className="border border-teal-400 divide-x-4" />
                <input type="date" id="end" name="end" value={dateRange.end} onChange={onChange} className="border border-teal-400 divide-x-4" />
            </div> */}
            <table className="w-full text-xs md:text-base">
                <thead className="text-xs md:text-base text-green-600 uppercase bg-gray-900">
                    <tr>
                        <th className="px-6 py-3">DATE</th>
                        <th className="px-6 py-3">TASK</th>
                        <th className="px-6 py-3">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        eods.map((data) => {
                            return <AccountTableRow key={data._id} data={data} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AccountEODTable;