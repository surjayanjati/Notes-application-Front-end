// Importing The Modules    ---------------------------->
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

// Importing The Componenets--------------------------->

import Home from "./components/Home";
import Login from "./components/Login"
import Notes from "./components/Notes"



// Function For Main ----------------------------------->
function Main(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/notes" element={<Notes/>}/>
        </Routes>
        </>
    )
};

// Exporting The Fucntions ------------------------------>
export default Main;