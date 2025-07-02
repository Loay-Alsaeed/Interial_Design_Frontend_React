import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard';
import Design from './pages/Design';
import Contact from './pages/Contact';
import Design2D from './pages/design2d';
import Design3D from './pages/Design3d';
import DesignForm from './pages/DesignForm';
import EditDesign from './pages/EditDesign';
import NotFound from './pages/NotFound';

function App() {

  return (

      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/design/:id" element={<Details/>} />
          <Route path="/design" element={<Design/>} />
          <Route path="/contact" element={<Contact/>} /> 
          <Route path="/2d" element={<Design2D/>} /> 
          <Route path="/3d" element={<Design3D/>} /> 
          <Route path="/design-form" element={<DesignForm/>} />
          <Route path="/design-form/:id" element={<EditDesign/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer/>
      </Router>
  );
}

export default App
