// Importing The Hooks ------------------------------------------>
import { useState } from "react";
// Importing The React Hooks------------------------------------->
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Importing The Action Form The Action File ---------------------->
import {getValue,postNote} from "../actions/noteActions";
// Importing The Style Sheet From src--------------
import "../style/form.css"



//// Function For Home Page---------------------->
function Login(){
  // Navigation Hooks Calling -------------------->
  const navigate=useNavigate();
  const [initialFormData,setFormData]=useState({
    number:"",
    password:""
  })
  /// Calling The UseDispatch Function -------------------------->
  const dispatch=useDispatch();
  
  // Function For describing The Form Event-------------------->
  async function formEvent(e){
    e.preventDefault();
    const data=JSON.stringify({number:initialFormData.number,password:initialFormData.password});
            const response=await fetch("/curdapp/api/v1/users/loginusers",{
                method:"POST",
                headers:{
                 "Content-type":"Application/json"
                },
                body:data
            });
            const responseData=await response.json();
            if(responseData.status===200){
              
               dispatch(getValue(responseData));
               navigate("/notes")
            }else if(responseData.status===403){
              alert(responseData.msg);

            }else if(responseData.status===400){
              alert(responseData.msg)
            }else if(responseData.status===204){
              alert(responseData.msg)
            }else if(responseData.status===500){
              alert(responseData.msg)
            }
  }
  // Function For Describing The InputEvent
  function inputEvent(e){
    
    // Object Destructring For Storing The Form Value
    const {name,value}=e.target;
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
            <form onSubmit={formEvent}>
           
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
               
                    name="password"  onChange={inputEvent}
                  />
                </div>
              </div>
              <div id="button-div">
                <button>Login</button>
              </div>
            </form>
          </div>
          <div id="box3">
            <p id="server-msg"></p>
            <br />
            <p>
              Don't Have an account?  
            </p>
            <a   onClick={()=>navigate("/")} >Signup..</a>
          </div>
        
        </div>
      </div>
        
        </>
    )
};




///////////Exporting The Function----------------->
export default Login;