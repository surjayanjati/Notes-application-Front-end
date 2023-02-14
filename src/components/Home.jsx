// Importing The Hooks And The Modules--------------------------->
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Importing The Style - File From The Style Folder which is inside Src
import "../style/form.css"





//// Function For Home Page---------------------->
function Home(){
    // Hooks For Navigation------------------------------------------------>
    const navigate=useNavigate();
    // Use State Hook For Storing Form Data From Input--------------------->
    const [initialFormData,setFormData]=useState({
     fname:"",
     number:"",
     password:""
    })
    // Function For activities on The Form Submission
    async function signUpFormSubmit(e){
        e.preventDefault();
        const data=JSON.stringify({name:initialFormData.fname,number:initialFormData.number,password:initialFormData.password})
        console.log("hi")
       const response=await fetch("/curdapp/api/v1/users/signupusers",{
        method:"POST",
        headers:{
         "Content-type":"Application/json"
        },
        body:data
       })
       const responseData=await response.json();
       if(responseData.status===200){
        navigate("/login");
       }else if(responseData.status===204){
        alert(responseData.msg);
       }else if(responseData.msg===500){
        alert(responseData.msg);
       }
    }
    // Function For activities on The Input
    function inputEvent(event){
       
        // Object destructring For Storing The Form Data
      const {name,value}=event.target;
      setFormData((preValue)=>{
        return{
            ...preValue,
            [name]:value
        }
      })
    }
    return(
        <>
        <div className="whole-container">
        <div className="main-box">
          <div id="box1">
            <div id="circle-box">
              <i className="fa-solid fa-book"></i>
            </div>
            <h2>Note-App</h2>
          </div>
          <div id="box2">
            <form onSubmit={signUpFormSubmit}>
              <div className="form-element-box">
                <div className="input-box1">
                <i className="fa-solid fa-person"></i>
                </div>
                <hr />
                <div className="input-box2">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                  
                    name="fname" onChange={inputEvent}
                  />
                </div>
              </div>
              <div className="form-element-box">
                <div className="input-box1">
                <i className="fa-solid fa-phone"></i>
                </div>
                <hr />
                <div className="input-box2">
                  <input
                    type="text"
                    placeholder="Enter Your Number"
                  
                    name="number" onChange={inputEvent}
                  />
                </div>
              </div>
              <div className="form-element-box">
                <div className="input-box1">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <hr />
                <div className="input-box2">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
               
                    name="password" onChange={inputEvent}
                  />
                </div>
              </div>
              <div id="button-div">
                <button>Sign Up</button>
              </div>
            </form>
          </div>

          <div id="box3">
            <p id="server-msg"></p>
            <br />
            <p>
              Already Have an account?  
            </p>
            <a id="loginButton-signupPage"  onClick={()=>navigate("/login")} >Login..</a>
          </div>
        </div>
      </div>
        </>
    )
};




///////////Exporting The Function----------------->
export default Home;