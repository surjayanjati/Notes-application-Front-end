/// Importing The Hooks-------------------------------->
import { useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
/// Importing The Css File----------------------------->
import "../style/modal.css";
/// Importing Actions From Action File----------------->
import { updateNote } from "../actions/noteActions";

/// Function For EditModal----------------------------->
function EditModal(props) {
  // Use State Hooks For Storing The Notes Value---------->
  const [initialData, setData] = useState();
  // Using UseNavigate For Storing The Function------------>
  const navigate=useNavigate();
  // Dispatch Function ------------------------------------>
  const dispatch=useDispatch();
  // Using UseState Hooks For Modal
  const [showModal, setShowModal] = useState(false);
  
  /// Array destrcuring For Storing The Cookies Value
  const [cookies, setCookies, removeCookie] = useCookies(["LoginCookie"]);

  // Varibale Creation Because Inside Modal Input Element is Not Working
  var formData = "";
  // Update Function---------------------------------->
  async function noteUpdate(idObject) {
    let userObj = JSON.stringify({
      notesValue: formData,
      notesId: idObject.notesId,
    });
    const response=await fetch("/curdapp/api/v1/users/notesusers",{
        method:"PUT",
        headers:{
            "Content-type":"Application/json",
             "access-token":cookies.LoginCookie,
        },
        body:userObj
    });
    const responseData=await response.json();
    // Using Swtich For doing action depending on response we are getting---->
    switch (responseData.status) {
        case 201:
            alert(responseData.msg);
            setShowModal(false);
             dispatch(updateNote({notesValue:formData,notesId:idObject.notesId}));
            break;
            case 401:
                alert(responseData.msg)
                setShowModal(false);
                navigate("/login");

                break;
                case 400:
            alert(responseData.msg)
            setShowModal(false);
            break;
        default:
            setShowModal(false);
            navigate("/login")
            break;
    }
  }

  // Form Event --------------------------------------->
  function formEvent(e) {
    e.preventDefault();
  }
  // Function For Storing The Value Input Change------------>
  function textEvent(e) {
    formData = e.target.value;
  }
  // Function Returning The Modal Component----------->
  const MyModal = (notesId) => {
    return (
      <>
        <div className="wrapper">
          <div className="modalcontainer">
            <div className="modalcontainer-box">
              <h4>UPDATE YOUR NOTE</h4>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setShowModal(false)}
              ></i>
            </div>
            <form onSubmit={formEvent} className="update-form">
              <div className="modalcontainer-box button-box">
                <input
                  type="text"
                  placeholder="Enter New Note"
                  onChange={textEvent}
                />
              </div>
              <div className="modalcontainer-box button-box">
                <button onClick={() => noteUpdate(notesId)}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      ></i>
      {showModal && <MyModal notesId={props.notesId} />}
    </>
  );
}

export default EditModal;
