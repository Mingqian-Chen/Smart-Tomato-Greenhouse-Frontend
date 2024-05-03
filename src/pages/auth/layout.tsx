import { Box, Stack, Typography } from '@mui/material'
import tomatoImage from '../../assets/images/tomato.png'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function Layout() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // if the url is exactly '/auth', redirect to '/auth/login'
    if (location.pathname === '/auth') {
      navigate('/auth/login', { replace: true });
    }
  }, [location, navigate]);

  return (
    <Box component={'main'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#F5F5F5' }}>
      <Box className="container" sx={{ display: 'flex', width: '1000px', height: '600px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.5)' }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: '50%', backgroundColor: '#7375F9', borderRadius: '10px 0 0 10px', padding: 5 }}
        >
          <Typography variant="h4" component="h1" align='left' sx={{ color: 'white', fontWeight: 'bold',width:'100%', maxWidth: '400px'}}>
            Smart Tomato Greenhouse
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', maxWidth: '400px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
          </Typography>

          <Box
            component="img"
            src={tomatoImage}
            alt="Welcome image"
            sx={{ height: 'auto', width: '100%', maxWidth: '400px' }}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: '50%', borderRadius: '0 10px 10px 0', padding: 4 }}
        >
          <Outlet />
        </Stack>
      </Box>
    </Box>
  )
}