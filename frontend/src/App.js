import Home from "./components/forms/Home";
import Navbar from "./components/navigation/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Register from "./components/forms/Register";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import '@progress/kendo-theme-default/dist/all.css';
import SubmitEOD from "./components/forms/SubmitEOD";
import Account from "./components/accounts/Account";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/register" element={<Register />} />
          <Route exact path="/user/submit" element={<SubmitEOD />} />
          <Route exact path="/user/account" element={<Account />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;