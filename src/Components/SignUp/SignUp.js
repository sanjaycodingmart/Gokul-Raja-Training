import React, {Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import '../SignIn/sigin.css';
import axios from 'axios';
const SignIn = ()=>{
    const [user,setuser]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
   const handleName=(event)=> setuser(event.target.value);
   const handleEmail=(event)=> setemail(event.target.value);
   const handlePass=(event)=> setpassword(event.target.value);
          
   const submitted = async()=>
    {
        let flag=false;
        if(user!=="" && password!==""){
            alert(user)
            let re =/\S+@\S+\.\S+/;
            if(re.test(email)){
                flag=true;
            }
            else{
                alert("Enter Valid Email Id");
            }
            
        }
        else{
            alert("Enter Valid UserName/Password");
        }
        if(flag){
            let responseBody={
                email:email,
                password:password,
                name:user
            }
            let resp=axios.post("http://localhost:3005/createUser",responseBody);
            resp.then((response)=>{
                console.log("response",response)
            })
        }

    }
    return(
        <Fragment>

<div id="id01" className="modal">

  <div className="modal-content animate">
  
    <div className="imgcontainer">
    <span 
className="close" title="Close Modal"><Link to ='/'>&times;</Link></span>
    <h3>Sign Up</h3>
    </div>

    <div className="container">
      <label><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="user" onChange={handleName} required/>
      <label><b>Email</b></label>
      <input type="email" placeholder="Enter Email Id" name="email" onChange={handleEmail} required/>

      <label><b>Password</b></label>
      <input type="password" placeholder="Enter Password" min="6" name="pass" onChange={handlePass} required/>
        
      <button type="submit" className="sign" onClick={submitted}>Sign Up</button>
    </div>
  </div>
</div>
        </Fragment>
    )
}
export default SignIn;