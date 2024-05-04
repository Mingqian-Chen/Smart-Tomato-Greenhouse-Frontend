import Box from '@mui/material/Box';
import { Alert, Collapse, Grid, IconButton } from '@mui/material';
import Layout from '../../components/layout/layout';
import { useEffect, useState } from 'react';
import { dataService } from '../../api/dataService';
import LineChart from '../../components/chartContainer/LineChart';
import CloseIcon from '@mui/icons-material/Close';

export interface Data {
    humidity: number[];
    status: number;
    temperature: number[];
    time: string[];
}

export default function PredictPage() {
    const [data, setData] = useState<Data | null>(null);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        dataService.getPredictData().then((res: any) => {
            setData(res)
        }).catch((error: any) => {
            console.error('Error fetching data:', error)
        })
    }, []);


    return (
        <Layout>
            <Collapse in={data?.status==1}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                if(data)
                                    setData({...data,status:0});
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Please be aware of the incoming unusual weather
                </Alert>
            </Collapse>
            <Collapse in={data?.status==2}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                if(data)
                                    setData({...data,status:0});
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Please be aware of the incoming unusual weather
                </Alert>
            </Collapse>
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
                                chartId="Temperature Forecast"
                                data={{ date: data?.time, value: data?.temperature }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LineChart
                                chartId="Humidity Forecast"
                                data={{ date: data?.time, value: data?.humidity }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>

    );
}
