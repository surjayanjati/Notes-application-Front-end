// Importing The React Hooks --------------------------------->
import useCookies from "react-cookie/cjs/useCookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Importing The Action From Action File---------------------->
import {getValue,postNote,storeEmpty} from "../actions/noteActions";

// Importing The Componenets From Componenet Folder------------>
import NotesTable from "./NotesTable";
// Importing The Css From Css File----------------------------->
import "../style/notes.css";

//// Function For Notes----------------------------------->
function Notes() {
  /// UseState Hook For Storing Notes Value----------------->
  const [initialData, setData] = useState();

  /// Array destrcuring For Storing The Cookies Value
  const [cookies, setCookies, removeCookie] = useCookies(["LoginCookie"]);
  
  // Using Selector Function For Getting The Values From Store------->
  let userDataArray = useSelector((state) => state.gettingValueReducer);
  console.log(userDataArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function For Logout Event by destroying The Cookie------------------->
  function logoutEvent() {
    removeCookie("LoginCookie");
    dispatch(storeEmpty());
    alert("Logout Successfull");
    navigate("/login");
  }

  // Function For Calling The Get Api Of Notes From Backend
  async function CallingNotes() {
    const response = await fetch("/curdapp/api/v1/users/notesusers", {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        "access-token": cookies.LoginCookie,
      },
    });
    const responseData = await response.json();
    if (responseData.status === 401) {
      navigate("/login");
    } else if (responseData.status === 500) {
      navigate("/login");
    } else if (responseData.status === 200) {
      alert(responseData.msg);
    } else {
      navigate("/login");
    }
  }
  /// Function For Storing Notes Values From Input To Hooks--------------->
  function inputEvent(e) {
    setData(e.target.value);
  }

  ///Function For Submitting The Notes------------------------------------>
  async function noteSubmit() {
    let notesId=Date.now().toString();
    
    let notesData = JSON.stringify({ notes: initialData,notesId:notesId });
    
    const response = await fetch("/curdapp/api/v1/users/notesusers", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        "access-token": cookies.LoginCookie,
      },
      body: notesData,
    });

    // Waiting For The Response--------->
    const responseData = await response.json();
    
    switch (responseData.status) {
      case 201:
        setData("");
        alert(responseData.msg);
        dispatch(postNote({ notes: initialData,notesId:notesId }));
        break;
      case 401:
        alert(responseData.msg);
        navigate("/login");
        break;
      case 400:
        alert(responseData.msg);
        break;
      default:
        alert("There is Some Error,Try Again");
    }
  }

  /// Function To Break Down The Store Object and Returning The NotesTable
  function arrayCheck() {
    if (userDataArray.length !== 0) {
      if (userDataArray[0].notesArray.length > 0) {
        let notesArray = userDataArray[0].notesArray;
        return notesArray.map((elem, key) => {
          return <NotesTable value={elem} key={key} />;
        });
      } else {
        return <p>Write Your First Note..</p>;
      }
    } else {
      
      return <p>No Notes To Show...</p>;
    }
  }

  useEffect(() => {
    CallingNotes();
  }, []);

  return (
    <>
      <div className="whole-containeri">
        <div className="main-boxi">
          <div id="box1i">
            <div className="box1-firstboxi">
              <div id="circle-boxi">
                <i className="fa-solid fa-book"></i>
              </div>
              <h2>Note-App</h2>
            </div>
            <div className="box1-firstboxi">
              <button id="logoutBtn" onClick={logoutEvent}>
                Logout
              </button>

              {userDataArray.length != 0 ? (
                <h2>{userDataArray[0].userName}</h2>
              ) : (
                <h2>Hi</h2>
              )}
            </div>
          </div>
          <div id="box2i">
            <div className="form-element-boxi">
              <div className="input-box1">
                <i className="fa-solid fa-phone"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input
                  type="text"
                  placeholder="Enter Your NOTE"
                  name="note"
                  onChange={inputEvent}
                />
              </div>
            </div>

            <div id="button-divi">
              <button onClick={noteSubmit}>Submit Note</button>
            </div>
          </div>
          <hr id="notesseparater" />
          <div className="box3">{arrayCheck()}</div>
        </div>
      </div>
    </>
  );
}

// Exporting The Notes ----------------------------------->
export default Notes;
