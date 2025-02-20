
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Service from './pages/Services/Service';
import Staffs from './pages/Staffs/Staffs';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthProvider from './context/AuthProvider';
import PrivateOutlet from './components/PrivateOutlet';
import AdminDashboard from './pages/Admin/AdminDashboard';
import StaffDashboard from './pages/Staff/StaffDashboard';
import ServiceDetails from './pages/Services/ServiceDetails';
import StaffDetails from './pages/Staffs/StaffDetails';

function App() {
  return (
   <AuthProvider>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Service />} />
        <Route path='/service-details/:id' element={<ServiceDetails/>} />
        <Route path='/staffs' element={<Staffs />} />
        <Route path='/staff-details/:id' element={<StaffDetails/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/' element={<PrivateOutlet/>} >
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/staff' element={<StaffDashboard/>} />

        
        </Route>
        
      </Routes>
   </AuthProvider>



  );
}

export default App;
