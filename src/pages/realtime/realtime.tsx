import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Layout from '../../components/layout/layout';
import PieChart from '../../components/chartContainer/PieChart';
import BarChart from '../../components/chartContainer/BarChart';
import mqtt, { MqttClient, IClientOptions, IClientPublishOptions, IClientSubscribeOptions } from 'mqtt';
import LineChart from '../../components/chartContainer/LineChart';
import { dataService } from '../../api/dataService';

interface Data {
    Temperature: number[],
    Humidity: number[],
    Datetime: string[]
}

const RealtimePage: React.FC = () => {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [connectStatus, setConnectStatus] = useState<string>('Connect');
    const [isSubed, setIsSubed] = useState<boolean>(false);
    const [src, setSrc] = useState("http://192.168.10.133:5000/video_feed");
    const [data, setData] = useState<Data>({ Temperature: [], Humidity: [], Datetime: [] });

    // useEffect(() => {
    //         dataService.getCurrentSensorData().then((res: any) => {
    //             setData({
    //                 Temperature:[...data.Temperature,res.Temperature],
    //                 Humidity:[...data.Humidity,res.Humidity],
    //                 Datetime:[...data.Datetime,res.Datetime],
    //             })
    //         }).catch((error: any) => {
    //             console.error('Error fetching data:', error)
    //         })
    //         setTimeout(()=>{
    //             dataService.getHistoryData().then((res: any) => {
    //                 setData({
    //                     Temperature:[...data.Temperature,...res.Temperature],
    //                     Humidity:[...data.Humidity,...res.Humidity],
    //                     Datetime:[...data.Datetime,...res.Datetime],
    //                 })
    //             }).catch((error: any) => {
    //                 console.error('Error fetching data:', error)
    //             })
    //         },5000)
    // }, []);

    // const handleConnect = (host: string, mqttOptions: IClientOptions) => {
    //     setConnectStatus('Connecting');
    //     // const mqttClient = mqtt.connect('ws://broker.emqx.io:8083/mqtt');
    //     const mqttClient = mqtt.connect(host, mqttOptions);
    //     mqttClient.on('connect', () => {
    //         setClient(mqttClient);
    //         console.log('Connection successful');
    //         mqttClient.subscribe('/iot/mqtt', { qos: 2 }, (error) => {
    //             if (error) {
    //                 console.error('Subscribe error', error);
    //             } else {
    //                 setIsSubed(true);
    //                 console.log('Subscribed to /iot/mqtt');
    //             }
    //         });
    //     });

    //     mqttClient.on('error', (err) => {
    //         console.error('Connection error: ', err);
    //         mqttClient.end();
    //     });

    //     mqttClient.on('reconnect', () => {
    //         setConnectStatus('Reconnecting');
    //     });

    //     mqttClient.on('message', (topic, message) => {
    //         const res = JSON.parse(message.toString());  // 解析 JSON 字符串
    //         console.log('res', res)
    //         setData(prevData => ({
    //             Temperature: [...prevData.Temperature, res.Temperature],
    //             Humidity: [...prevData.Humidity, res.Humidity],
    //             Datetime: [...prevData.Datetime, res.Datetime],
    //         }))
    //         console.log('data:', data)
    //         console.log(1)
    //         const payload = { topic, message: message.toString() };
    //         setMessages(prevMessages => [...prevMessages, payload]);
    //         console.log(`Received message: ${message} from topic: ${topic}`);
    //     });

    //     return () => {
    //         mqttClient.end();
    //     };
    // };

    useEffect(() => {
        const mqttClient = mqtt.connect('wss://xd63b66a.ala.asia-southeast1.emqxsl.com:8084/mqtt', {
            port: 8084,
            keepalive: 60,
            clientId: "iot-frontend-subscriber",
            username: "iot",
            password: "11413",
            protocol: 'wss',
        });

        mqttClient.on('connect', () => {
            setClient(mqttClient);
            console.log('Connected');
            mqttClient.subscribe('/iot/mqtt', { qos: 2 }, (error) => {
                if (error) {
                    console.error('Subscribe error', error);
                } else {
                    setIsSubed(true);
                    console.log('Subscribed to /iot/mqtt');
                }
            });
        });
        mqttClient.on('error', (err) => {
            console.error('Connection error: ', err);
            mqttClient.end();
        });

        mqttClient.on('reconnect', () => {
            setConnectStatus('Reconnecting');
        });
        mqttClient.on('message', (topic, message) => {
            const res = JSON.parse(message.toString());  // 解析 JSON 字符串
            console.log('res', res.Temperature)
            setData(prevData => ({
                Temperature: [...prevData.Temperature, res.Temperature],
                Humidity: [...prevData.Humidity, res.Humidity],
                Datetime: [...prevData.Datetime, res.Datetime],
            }))
            console.log('data:', data)
            console.log(`Received message: ${message} from topic: ${topic}`);
        });

        return () => {
            mqttClient.end();
            console.log('Disconnected');
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render.

    const handleSubscribe = (topic: string, qos: number) => {
        console.log(11)
        client?.subscribe(topic, { qos } as IClientSubscribeOptions, (error) => {
            if (error) {
                console.log('Subscribe to topics error', error);
                return;
            }
            console.log(`Subscribe to topic: ${topic}`);
            setIsSubed(true);
        });
        console.log(2)
    };

    const handleUnsub = (topic: string) => {
        client?.unsubscribe(topic, (error) => {
            if (error) {
                console.log('Unsubscribe error', error);
                return;
            }
            console.log(`Unsubscribed from topic: ${topic}`);
            setIsSubed(false);
        });
    };

    const handlePublish = (pubRecord: { topic: string; qos: number; payload: string }) => {
        if (client) {
            const { topic, qos, payload } = pubRecord;
            client.publish(topic, payload, { qos } as IClientPublishOptions, (error) => {
                if (error) {
                    console.log('Publish error: ', error);
                }
            });
        }
    };

    const handleDisconnect = () => {
        if (client) {
            client.end(false, () => {
                setConnectStatus('Connect');
                setClient(null);
                console.log('Disconnected successfully');
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // 更新src来刷新iframe，使用时间戳确保URL每次都不同
            setSrc(`http://192.168.10.133:5000/video_feed?timestamp=${new Date().getTime()}`);
        }, 50000);  // 设置时间间隔为5000毫秒，即5秒

        // 组件卸载时清除定时器
        return () => clearInterval(interval);
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
                                chartId="TemperatureLineChart"
                                data={{ date: data?.Datetime, value: data?.Temperature }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LineChart
                                chartId="HumidityLineChart"
                                data={{ date: data?.Datetime, value: data?.Humidity }}
                            />
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems="center">
                            <iframe src={src} width="680" height="500">
                                <p>Your browser does not support iframes.</p>
                            </iframe>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    );
};
export default RealtimePage;

