// DistributionPieChart.tsx
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@mui/material';
interface Data {
    date: string;
    value: number;
}
interface PieChartProps {
    /** ID of chart */
    chartId: string;
    /** URL of the API endpoint */
    data: Data[];
}

const PieChart = ({ chartId, data }: PieChartProps) => {

    useEffect(() => {
        var chartDom = document.getElementById(chartId);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '  Pie Chart',
                subtext: 'Data from Backend',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: data.map(item => item.date)
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
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

export default PieChart;