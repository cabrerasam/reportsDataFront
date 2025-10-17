import { Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Login from './pages/login/Login'
import CreateReport from './pages/reportForms/reports/CreateReport'
import Reports from './pages/reportForms/reports/Reports'

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='/createReport' element={<CreateReport />} />
        <Route path='/reports' element={<Reports />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Routing
