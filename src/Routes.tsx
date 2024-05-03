import {
    BrowserRouter as Router,
    Routes as ReactRoute,
    Route,
} from 'react-router-dom'
import  OverviewPage  from './pages/overview'
import AuthLayout from './pages/auth/layout'
import SignupForm from './components/auth/SignupForm'
import LoginForm from './components/auth/LoginForm'
import RealtimePage from './pages/realtime/realtime'
import PredictPage from './pages/predict/predict'

export const Routes = () => {
    return (
        <Router>
            <ReactRoute>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/realtime" element={<RealtimePage />} />
                <Route path="/forecast" element={<PredictPage />} />
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route path='signup' element={<SignupForm/>}/>
                    <Route path='login' element={<LoginForm/>}/>
                </Route>
            </ReactRoute>
        </Router>
    )
}
