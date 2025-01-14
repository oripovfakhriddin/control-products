import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Edit from "./pages/edit/Edit";
import Settings from "./pages/settings/Settings";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path='new'
              element={
                <RequireAuth>
                  <New
                    inputs={productInputs}
                    title={`Yangi mahsulot qo'shish`}
                  />
                </RequireAuth>
              }
            />
            <Route
              path='edit/:id'
              element={
                <RequireAuth>
                  <Edit
                    inputs={productInputs}
                    title={`Mahsulotni tahrirlash`}
                  />
                </RequireAuth>
              }
            />
            <Route
              path='settings/:id'
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
