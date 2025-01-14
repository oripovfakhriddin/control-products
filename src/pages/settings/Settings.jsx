import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import "./settings.scss";

const Settings = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState(
    auth.currentUser ? auth.currentUser.email : ""
  );
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          const emailPromise =
            email !== user.email ? updateEmail(user, email) : Promise.resolve();

          const passwordPromise = password
            ? updatePassword(user, password)
            : Promise.resolve();

          return Promise.all([emailPromise, passwordPromise]);
        })
        .then(() => {
          dispatch({ type: "LOGOUT" });
          toast.success(
            "Ma'lumotlar muvaffaqiyatli yangilandi! Tizimdan chiqasiz."
          );
          navigate("/login");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Noto‘g‘ri parol!");
          } else {
            toast.error(`Xatolik: ${error.message}`);
          }
        });
    } else {
      toast.error("Foydalanuvchi tizimga kirmagan!");
    }
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='login'>
          <form onSubmit={handleUpdate}>
            <input type='email' placeholder='email' readOnly value={email} />
            <label htmlFor='password'>Joriy parol</label>
            <input
              type='password'
              placeholder='Joriy parol'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <label htmlFor='password'>Yangi parol</label>
            <input
              type='password'
              placeholder='Yangi parol'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Tasdiqlash</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
