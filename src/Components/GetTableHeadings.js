import React, {Fragment, useState } from 'react';
import './signin.css';
import EntryTable from './EntryTable';
import queryString from 'query-string'
export default function TableHeaders(){
    let objResponse={}
    const [submit,changeSubmit]= useState(false);
    const [titles,setTitles]=useState([])
    const [row,setRow]=useState("")
    const [fname,setFname]=useState("")
    const[user,setUser]= useState("")
    const handleTitle = (e) =>{
        setTitles(e.target.value);
    }
    const handleRow = (e) =>{
      setRow(e.target.value)
    }
    const handleFile = (e)=>{
      setFname(e.target.value)
    }
        async function processTitles(titles){
          let templateArray=[];
          
          for(let title in titles) {
            let templateObject={
              "Header":"",
              "accessor":""
            }
            templateObject.Header=titles[title];
            templateObject.accessor=titles[title];
            templateArray.push(templateObject);
          };
          return templateArray
    }
    async function showTitleEntry  (){
      
        let titleArray=titles.split(",");
        
        titleArray.forEach(element => {
          objResponse[element]=""
        });
        console.log("response",objResponse)
        let tempTitle=await processTitles(titleArray);
        setTitles(tempTitle);
        setUser(window.location.href.substring(36));
        changeSubmit(true);
    }
    return(
        <Fragment>
       {!submit && <div className="login-container">
        <div className="formElement">
           <label>Enter the titles:</label> <input type="text" id="userName" onChange={handleTitle} />
        </div>
        <div className="formElement">
          <label><b>Use Comma( , ) to separate titles</b></label>
        </div>
        <div className="formElement">
           <label>Enter the Number of Rows:</label> <input type="text" id="row" onChange={handleRow} />
        </div>
        <div className="formElement">
           <label>Enter the File Name:</label> <input type="text" id="fname" onChange={handleFile} />
        </div>
        <div className="formElement">
          <button onClick={showTitleEntry}>Create Table</button>
        </div>
        </div>}
        {submit && <EntryTable titles={titles} row={row} file={fname} respond={objResponse} user={user}/>}
        </Fragment>
    )
}
