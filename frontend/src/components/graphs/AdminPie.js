import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartTooltip,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPie = (props) => {

    const navigate = useNavigate(null);
    const { text } = props;

    const renderTooltip = context => {
        const { category, value } = context.point || context;

        return (
            <div>
                {category}: {value}%
            </div>
        );
    };

    const labelContent = e => e.category;

    const COLORS = {
        submitted: "green",
        notSubmitted: "red",
    };

    const [data, setData] = useState([{
        status: "Submitted",
        value: 0,
        color: COLORS.submitted,
    },
    {
        status: "Not Submitted",
        value: 0,
        color: COLORS.notSubmitted,
    }]);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {

            const response = await fetch('http://127.0.0.1:5000/api/admin/fetch-current-submission-status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();
            if (json.success) {

                let series = [{
                    status: "Submitted",
                    value: json.data.submissionPercentage,
                    color: COLORS.submitted,
                },
                {
                    status: "Not Submitted",
                    value: json.data.nonSubmissionPercentage,
                    color: COLORS.notSubmitted,
                }];

                setData(series);
            }
            else alert("Cannot fetch employees' data at the moment!");
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex justify-center">
            <Chart>
                <ChartTitle text={text} />
                <ChartLegend visible={false} />
                <ChartTooltip render={renderTooltip} />
                <ChartSeries>
                    <ChartSeriesItem
                        type="donut"
                        data={data}
                        categoryField="status"
                        field="value"
                    >
                        <ChartSeriesLabels
                            color="#fff"
                            background="none"
                            content={labelContent}
                        />
                    </ChartSeriesItem>
                </ChartSeries>
            </Chart>
        </div>
    )
}

export default AdminPie;