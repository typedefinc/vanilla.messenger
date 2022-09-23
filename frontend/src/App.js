import './App.css';
import LoginPage from "@views/LoginPage";
import SignInPage from "@views/SignInPage";
import { Route, Routes } from "react-router-dom";

const App = () =>
  <div className="dark:bg-[#19161D]">
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signin" element={<SignInPage />}/>
    </Routes>
  </div>;

export default App;
