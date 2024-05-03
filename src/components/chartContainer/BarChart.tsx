// BarChart.tsx

import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@mui/material';

interface Data {
    name: string;
    value: number;
}

interface BarChartProps {
    /** ID of chart */
    chartId: string;
    /** URL of the API endpoint */
    apiUrl: string;
}

const BarChart = ({ chartId, apiUrl }: BarChartProps) => {
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        var chartDom = document.getElementById(chartId);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: 'Bar Chart',
                subtext: 'Data from Backend',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item.name) // Map the names to xAxis data
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data.map(item => item.value), // Map the values to series data
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);
    }, [chartId, data]);

    return (
        <Box sx={{ display: 'inline-block', bgcolor: 'white', p: 2, width: "100%" }}>
            <div id={chartId} style={{ height: 360, width: "100%" }}></div>
        </Box>
    )
};

export default BarChart;
