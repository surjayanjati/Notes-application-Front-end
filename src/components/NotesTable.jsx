// Importing The Hooks ------------------------------>
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Importing The Modules ---------------------------->
import { useCookies } from "react-cookie";

// Importing The Actions ---------------------------->
import {getValue,postNote,deleteNote} from "../actions/noteActions";
// Importing The Component--------------------------->
import EditModal from "./EditModal";


function NotesTable(props){
  const navigate=useNavigate();
  const dispatch=useDispatch();
 // Importing The UseSelector And Storing The Value inside Variable
 let userData=useSelector((state)=>state.gettingValueReducer);
 // Storing The Only Notes Array From The UserData Object---------->
 // Using React Cookie For Getting The Cookie Value------------>
 let [cookie,setCookies,deleteCookie]=useCookies(["LoginCookie"]);

 // Function For Deleting The Notes Using The NotesId---------------------->
 async function noteDelete(notesId){
   let notesIdObj=JSON.stringify({notesId:notesId});
   // Fetch Function For Calling The DeleteNote - Api------------------>
   let response=await fetch("/curdapp/api/v1/users/notesusers",{
    method:"DELETE",
    headers:{
      "Content-type":"Application/json",
      "access-token":cookie.LoginCookie,
    },
    body:notesIdObj
   });
   
   let responseObj=await response.json();
   switch (responseObj.status) {
    case 401:
      alert(responseObj.msg);
      navigate("/login");
      break;
     case 201:
      alert(responseObj.msg);
      dispatch(deleteNote(notesId));
      break;
      case 400:
        alert(responseObj.msg);
        break;
        case 500:
          alert(responseObj.msg);
          navigate("/login")
          break;
    default:
      break;
   }

 }

    return(
        <>
        

                <div className="box3-notebox">
                <div className="textbox">
                  <p>{props.value.notes}</p>
                </div>
                <div className="buttonbox">
                  <i className="fa-solid fa-trash" onClick={()=>noteDelete(props.value.notesId)} >
                    
                  </i>
                </div>
                <div className="buttonbox">
                 <EditModal notesId={props.value.notesId} />
                </div>
              </div>

            
        

        </>
    )
}

export default NotesTable;