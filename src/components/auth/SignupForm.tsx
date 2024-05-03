import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SignUpParams, authClient } from '../../api/authClient'
import { useState } from 'react'

export default function SignupForm() {
  const navigate = useNavigate() //init navigate
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  // Event handlers to update state based on user input
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value);
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);
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
        Sign up for AquaEasy
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
          id="firstName-input"
          label="First Name"
          autoComplete="given-name"
          onChange={handleFirstNameChange}
        >
          {firstName}
        </TextField>
        <TextField
          id="lastName-input"
          label="Last Name"
          autoComplete="family-name"
          onChange={handleLastNameChange}
        >
          {lastName}
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
      <Button variant="contained" onClick={handleSignup}>Submit</Button>
      <Typography color="text.secondary" variant="body2">
        Already have an account?{' '}
        <Link href={'/auth/login'} underline="hover" variant="subtitle2">
          Login
        </Link>
      </Typography>
    </Box>
  )

  function handleSignup() {
    let param: SignUpParams = { email: email, first_name: firstName, last_name: lastName, password: password }
    // // console.log('param:', param)
    // authClient.signUp(param).then((res) => {
    //   // console.log('res:', res)
    //   navigate('/auth/login')
    // })
    navigate('/auth/login')
  }
}