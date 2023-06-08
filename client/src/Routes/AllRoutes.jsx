import { Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

const AllRoutes = () => {
  return <>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </>
};

export default AllRoutes;
