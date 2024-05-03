import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Layout from '../../components/layout/layout';
import { useEffect, useState } from 'react';
import { dataService } from '../../api/dataService';
import LineChart from '../../components/chartContainer/LineChart';

interface Data {
    Temperature: number[],
    Humidity: number[],
    Datetime: string[]
}

export default function OverviewPage() {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        dataService.getHistoryData().then((res: any) => {
            setData(res)
        }).catch((error: any) => {
            console.error('Error fetching data:', error)
        })
    }, []);

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                {/* Displaying of components */}
                <Box
                    sx={{
                        p: 1,
                        backgroundColor: '#f0f0f0',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'auto',
                    }}
                >
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <LineChart
                                chartId="Temperature History Data"
                                data={{date:data?.Datetime,value:data?.Temperature}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LineChart
                                chartId="Humidity History Data"
                                data={{date:data?.Datetime,value:data?.Humidity}}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>

    );
}
