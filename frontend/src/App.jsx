import Container from '@mui/material/Container';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import LoginForm from './Components/LoginForm.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Navbar from './Components/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
      <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
      </Container>
    </>
  )
}

export default App
