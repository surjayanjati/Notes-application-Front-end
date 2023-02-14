// Importing The Modules--------------------------------------------->
import { BrowserRouter } from "react-router-dom";


// Importing The Componenets--------------------------->
import Main from "./Main";



// Function For App------------------------------------>
function App(){
    return(
        <>
        <BrowserRouter>
        <Main/>
        </BrowserRouter>
        </>
    )
};


// Exporting The Functions------------------------------>
export default App;