import React, { Component, Fragment } from 'react';
import './signin.css';
import firebase from '../firebase.js'


class SignIn extends Component{
    state={
        userName:"",
        password:""
    }
    
    handleForm =(e)=>{
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    signin = () =>{
        
          let dbArray=firebase.database().ref(this.state.userName);
          console.log(dbArray);
          dbArray.on('value',(snapshot)=>{
                let username=snapshot.val();
                console.log(typeof username)
                let newState=[];
                
                    newState.push(
                    {
                        username:username.username,
                        password:username.password
                    }
                    )
                    console.log(newState)
                    if((newState[0].username===this.state.userName)&&(newState[0].password===this.state.password))
            {
                alert("Login Successful ")
                localStorage.setItem("user",this.state.userName);
                this.props.history.push('/account'+'/?user='+this.state.userName,{name:this.state.userName})
            } 
            else{
                alert("Error with Login");
            }   
          })
          
        
        
    }
    render()
    {
        return(
            <Fragment>
            <div className="login-container">
            <div className="formElement">
               <label>Username:</label> <input type="text" name="userName" onChange={this.handleForm} />
            </div>
            <div className="formElement">
              <label>Password:</label>  <input type="password" name="password" onChange={this.handleForm}/>
            </div>
            <div className="formElement">
              <button onClick={this.signin}>Login</button>
            </div>
            </div>
            </Fragment>
        )
    }
}
export default SignIn;