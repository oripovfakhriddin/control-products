import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import "./sidebar.scss";

const Sidebar = () => {
  const { dispatch: authDispatch, currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    toast.info("Tizimdan muvaffaqiyatli chiqildi.");
  };

  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <span className='logo'>Omborxona</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>Asosiy</p>
          <Link to='/' className='dash'>
            <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </Link>
          <p className='title'>Xizmatlar</p>
          <Link to={`/settings/${currentUser.uid}`} className='dash'>
            <SettingsApplicationsIcon className='icon' />
            <span>Sozlamalar</span>
          </Link>
          <p className='title'>Foydalanuvchi</p>
          <li>
            <button className='log-btn' onClick={handleLogout}>
              <ExitToAppIcon className='icon' />
              <span>Chiqish</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
