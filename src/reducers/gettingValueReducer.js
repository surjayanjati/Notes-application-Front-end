// Importing The React Hooks------------------------------->
import { useNavigate } from "react-router-dom";


// Reducer Function For Login Form Action
let NotesArray=[
   
]

 function gettingValueReducer(state=NotesArray,Action){
   
         switch (Action.type) {
            case "GETVALUE":
               // Object Destrcuring For Storing The Value
               const {userName,notesArray}=Action.payLoad
               
               return[
                  ...state,
                  {
                    userName:userName,
                    notesArray:notesArray
                     }
                  
               ];
              
               // In The Case When LogOut Has Been Clicked , And You Need To Empty The Store---------------------------------->
               case "EMPTYSTORE":
                  return [];


               case "POSTNOTE":
            // Object Destrcuring For Storing The Value
                const {notesValue,notesId}=Action.payLoad;
                
               
                // Pushing The New Notes Object Inside The State
                state[0].notesArray.push({notes:notesValue,notesId:notesId});
                return state;
                break;

                case "DELETENOTE":
                  // Storing The VALUE Of UserName From The State--------------------------------------------------->
                  let name=state[0].userName;
                  
                  let id=Action.notesId;
                  // Array Filter Method For Returning All The Array apart from The one which has same Id------------>
                  let newArray=state[0].notesArray.filter((elem)=>elem.notesId!==id);
                  
                  return[
                  
                     {
                       userName:name,
                       notesArray:newArray
                     }
                  ];

                  // In The Case When Updating of Notes will Happen--------------------------------------------------->
                  case "UPDATENOTE":
                        // Storing The VALUE Of UserName From The State--------------------------------------------------->
                  let updateUserName=state[0].userName;
                     // Object Destructuring------------------>
                     const {Value,Id}=Action.payLoad;
                
                  // First Doing The Filter Method To remove The Notes which has this Id------------------>
                  let finalUpdateNotesArray=state[0].notesArray.filter((elem)=>elem.notesId!==Id);
                  finalUpdateNotesArray.push({notes:Value,notesId:Id});
                  return[
                        {
                           userName:updateUserName,
                           notesArray:finalUpdateNotesArray
                        }
                  ]
            default: return state;
        
         }
};



export default gettingValueReducer;