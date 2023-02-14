 export const getValue=(notesObj)=>{
    
    return{
        type:"GETVALUE",
        payLoad:{
            userName:notesObj.userName,
            notesArray:notesObj.notesData
        }
    }
};

export const postNote=(notesObj)=>{
    
    
    return {
        type:"POSTNOTE",
        payLoad:{
            notesValue:notesObj.notes,
            notesId:notesObj.notesId
        }
    }
}

export const deleteNote=(notesId)=>{
    return {
        type:"DELETENOTE",
        notesId:notesId
    }
}

export const storeEmpty=()=>{
    return{
        type:"EMPTYSTORE"
    }
}

export const updateNote=(notesObj)=>{
    console.log(notesObj);
    return{
        type:"UPDATENOTE",
        payLoad:{
            Value:notesObj.notesValue,
            Id:notesObj.notesId
        }
    }
}