import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
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
          <li>
            <PsychologyOutlinedIcon className='icon' />
            <span>Loglar</span>
          </li>
          <Link to={`/settings/${currentUser.uid}`} className='dash'>
            <SettingsApplicationsIcon className='icon' />
            <span>Sozlamalar</span>
          </Link>
          <p className='title'>Foydalanuvchi</p>
          <li>
            <AccountCircleOutlinedIcon className='icon' />
            <span>Hisob</span>
          </li>
          <li>
            <button className='log-btn' onClick={handleLogout}>
              <ExitToAppIcon className='icon' />
              <span>Chiqish</span>
            </button>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;
