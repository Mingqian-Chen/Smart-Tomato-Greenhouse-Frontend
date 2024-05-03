// LineChart.tsx
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@mui/material';
interface Data {
    date?: string[];
    value?: number[];
}
interface LineChartProps {
    /** ID of chart */
    chartId: string;
    /** URL of the API endpoint */
    data: Data;
}

const RealtimeLineChart = ({ chartId, data }: LineChartProps) => {

    useEffect(() => {
        // console.log('data:',data)
        var chartDom = document.getElementById(chartId);
        var myChart = echarts.init(chartDom);
        var option;
        var y;
        if (chartId=='Temperature History Data'||chartId=='Temperature Forecast'){
          y='℃'
        }else if(chartId=='Humidity History Data'||chartId=='Humidity Forecast'){
          y='%'
        }

        option = {
            title: {
              text: chartId,
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c}'
            },
            legend: {
              left: 'left'
            },
            xAxis: {
              type: 'category',
              name: 'x',
              splitLine: { show: false },
              data: data.date
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: {
              type: 'log',
              name: y,
              minorSplitLine: {
                show: true
              }
            },
            series: [
              {
                name: '',
                type: 'line',
                data: data.value
              },
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

export default RealtimeLineChart;