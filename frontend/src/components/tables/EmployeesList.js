import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table"

const EmployeeList = () => {

    const navigate = useNavigate(null);
    const [location, setLocation] = useState("Guwahati");
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {

            const response = await fetch('http://127.0.0.1:5000/api/common/fetch-employees-by-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                },
                body: JSON.stringify({ location })
            })

            const json = await response.json();

            if (json.success) {
                setEmployees(json.employees);

            } else alert("Cannot fetch employees' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/api/common/fetch-employees-by-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
            },
            body: JSON.stringify({ location })
        })

        const json = await response.json();

        if (json.success) {
            setEmployees(json.employees);
        } else alert("Cannot fetch employees' list at the moment!");
    }

    const getEODList = (e) => {
        let empID = e.target.innerText.split(" ")[0];

        if (localStorage.getItem('user') === 'admin')
            navigate('/admin/all-eods-list', { state: { 'empID': empID } });
        else if (localStorage.getItem('user') === 'manager')
            navigate('/manager/eod-assessment-panel', { state: { 'empID': empID } });
    }

    const columns = useMemo(
        () => [
            {
                id: 'name',
                Header: 'EMPLOYEES LIST',
                accessor: (row) => {
                    return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.empID + ' ' + row.name}</span>
                }
            }
        ],
        // eslint-disable-next-line
        []
    )

    const data = useMemo(() =>
        employees,
        [employees]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data
        },
    )

    const onChange = (e) => {
        setLocation(e.target.value);
    }

    return (
        <div className="flex flex-col">
            <div className="w-full md:w-3/4 my-4">
                <form className="flex flex-row justify-around items-center" onSubmit={handleSubmit}>
                    <label className="text-base md:text-lg mt-4" htmlFor="location">Location</label>
                    <select type="text" className="rounded-lg w-32 md:w-48 text-xs md:text-base bg-slate-300 mt-2 p-2 focus:border-blue-500" name="location" id="location" value={location} onChange={onChange} >
                        <option value="Guwahati">Guwahati</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                    <button type="submit" className="w-20 md:w-40 h-8 md:h-9 mt-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg text-xs md:text-base" >Submit</button>
                </form>
            </div>
            <div className="overflow-auto h-full">
                <table className="w-full text-xs md:text-base" {...getTableProps()} id="list">
                    <thead className="text-xs md:text-base uppercase" style={{backgroundColor: '#a0c336'}}>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className="text-slate-50 px-6 py-3" {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr className="text-xs md:text-base border-2" {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td className="bg-white text-center" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList;