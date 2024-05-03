// LineChart.tsx
import React, { useEffect, useRef, useState } from 'react';
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

const LineChart = ({ chartId, data }: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const myChartRef = useRef<echarts.ECharts | null>(null);
  useEffect(() => {
    if (chartRef.current && !myChartRef.current) {
      myChartRef.current = echarts.init(chartRef.current);
    }

    const yLabel = chartId.includes('Temperature') ? '℃' : '%';

    const option = {
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
        name: yLabel,
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

    if (myChartRef.current) {
      myChartRef.current.setOption(option);
    }

    return () => {
      myChartRef.current?.dispose();
      myChartRef.current = null;
    };
  }, [chartId, data]);

  return (
    <Box sx={{ display: 'inline-block', bgcolor: 'white', p: 2, width: "100%" }}>
      <div ref={chartRef} style={{ height: 360, width: "100%" }}></div>
    </Box>
  )
};

export default LineChart;