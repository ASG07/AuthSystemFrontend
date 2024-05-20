import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import GoogleCallback from './pages/GoogleCallback';
import Home from './pages/Home';
import Registeration from './pages/Registeration';
import NavBar from './pages/NavBar';
import { AuthProvider } from './context/AuthProvider';
import Profile from './pages/Profile';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import WelcomePage from './pages/WelcomePage';
import { Toggle } from './components/Toggle';
import useLocalStorage from "use-local-storage";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      console.log("you are authenricated")
    }
    else {
      console.log("you are Not authenricated")
    }
  }, []);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registeration" element={<Registeration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/google-callback" element={<GoogleCallback />} />
              <Route path="/requestResetPassword" element={<RequestResetPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/confirmEmail" element={<ConfirmEmail />} />
              <Route path="/welcomePage" element={<WelcomePage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </AuthProvider>
        </I18nextProvider>
      </BrowserRouter></div>
  );
}

export default App;
