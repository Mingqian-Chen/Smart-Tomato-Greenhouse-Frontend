import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { authClient } from '../../api/authClient'
import { useState } from 'react'

export default function LoginForm() {
  const navigate = useNavigate() //init navigate
  const location = useLocation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


// Event handlers to update state based on user input
const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  return (
    <Box    //sign up form container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '& div': { display: 'flex' },
        '& .MuiTextField-root': { m: 1, flexGrow: 1 },
        '& Button': { m: 1 },
        '& p': { m: 1 },
        '& h2': { m: 1 },
      }}
    >
      <Typography variant="body2" sx={{ color: 'gray' }}>
        Start for free
      </Typography>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        Login for AquaEasy
      </Typography>
      <div>
        <TextField
          required
          fullWidth
          id="email-input"
          label="Email"
          autoComplete="email"
          onChange={handleEmailChange}
        >
          {email}
        </TextField>
      </div>
      <div>
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          autoComplete="new-password"
          onChange={handlePasswordChange}
        >
          {password}
        </TextField>
      </div>
      <Button variant="contained" onClick={handleLogin}>Submit</Button>
      <Typography color="text.secondary" variant="body2">
        Don&apos;t have an account?{' '}
        <Link href={'/auth/signup'} underline="hover" variant="subtitle2">
          Sign up
        </Link>
      </Typography>
    </Box>
  )

  function handleLogin() {
    // authClient.login({ email:email, password:password }).then((res) => {
    //   // console.log('res.data:',res)
    //   const urlParams = new URLSearchParams(location.search);
    //   const next = urlParams.get('next') || '/'
    //   navigate(next)
    // })
    navigate('/')
  }
}