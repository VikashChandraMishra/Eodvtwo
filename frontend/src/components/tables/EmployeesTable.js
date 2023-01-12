import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table"

const EmployeeTable = () => {

    const navigate = useNavigate(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {

            const response = await fetch('http://127.0.0.1:5000/api/common/fetch-employees-by-branch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();

            if (json.success) {
                setEmployees(json.employees);
            } else alert("Cannot fetch employees' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const getEODList = (e) => {

        let empID = e.target.innerText.split(" ")[0];

        if (localStorage.getItem('user') === 'admin')
            navigate('/admin/eods-list', { state: { 'empID': empID } });
        else if (localStorage.getItem('user') === 'manager')
            navigate('/manager/eod-panel', { state: { 'empID': empID } })

    }

    const columns = useMemo(
        () => [
            {
                id: 'guwahati',
                Header: "GUWAHATI",
                accessor: (row) => {
                    return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Guwahati}</span>
                },
            },
            {
                id: 'delhi',
                Header: "DELHI",
                accessor: (row) => {
                    return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Delhi}</span>
                },
            },
            {
                id: 'chennai',
                Header: "CHENNAI",
                accessor: (row) => {
                    return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Chennai}</span>
                },
            },
            {
                id: 'mumbai',
                Header: "MUMBAI",
                accessor: (row) => {
                    return <span onClick={getEODList} style={{ cursor: "pointer" }} >{row.Mumbai}</span>
                },
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


    return (
        <div className="overflow-auto h-full">
            <table className="w-full text-xs md:text-base" {...getTableProps()} id="list">
                <thead className="text-xs md:text-base text-green-600 uppercase bg-gray-900">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className="px-6 py-3" {...column.getHeaderProps()}>
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
                                    return <td className="bg-white" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeTable;