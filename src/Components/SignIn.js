import React, { Component, Fragment } from 'react';
import './signin.css';
import SaveUser from './SaveUser';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            mobile:"",
            lang:""
        }
        this.validate=this.validate.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.validateEmail=this.validateEmail.bind(this);
        this.validateMobile=this.validateMobile.bind(this);

    }
    handleChange(event){
        if(event.target.id==="name"){
            this.setState({
                name:event.target.value
            });
        }
        else if(event.target.id==="email"){
            this.setState({
                email:event.target.value
            });
        }
        else if(event.target.id==="mobile"){
            this.setState({
                mobile:event.target.value
            });
        }
        else if(event.target.id==="lang"){
        this.setState({
            lang:event.target.value
    })
}
    }
    validateEmail(email) {
        let  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validateMobile(mobile)
    {
        let phoneno =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phoneno.test(mobile))
        {
         return true;
        }
        else
        {
        return false;
        }
    }
   
    validate(){
        let flag1=false;
        let flag2 =false;
        let flag3=false;
        if(this.state.name.replace(/ /g,'')===""){
            document.getElementById("invalidName").style.display="block";
            flag1=false;
        }
        else{
            document.getElementById("invalidName").style.display="none";
            flag1=true;
        }
        if(this.state.email===""){
            document.getElementById("invalidEmail").style.display="block";
            flag2=false;
        }
        else if(this.validateEmail(this.state.email)){
            document.getElementById("invalidEmail").style.display="none";
            flag2=true;
        }
        else{
            document.getElementById("invalidEmail").style.display="block";
            flag2=false;
        }
        if(this.state.mobile===""){
            document.getElementById("invalidMobile").style.display="block";
            flag3=false;
        }
        else if(this.validateMobile(this.state.mobile)){
            document.getElementById("invalidMobile").style.display="none";
            flag3=true;
        }
        else{
            document.getElementById("invalidMobile").style.display="block";
            flag3=false;
        }
        if(flag1===true &&flag2===true &&flag3===true){
            console.log(flag1,flag2,flag3);
            SaveUser(this.state);
            this.props.history.push(`/dashboard/?search=${this.state.name}`)
        }
    }
    componentDidMount(){
        if(localStorage.length>0)
        {
            let names="gokul"
            this.props.history.push(`/dashboard/?search=${names}`)
        }
    }
    render(){
        return(
            <Fragment>
            <div className="article">

            </div>
                <div className="login-container">
                    <h1>Sign Up the Form</h1>
                </div>
                <div className="form-container">
                    
                    <ul>
                    <li>
                        {/* <label>Name :</label> */}
                        <input type="text" minLength="5" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter your good name here..."/>
                        </li>
                    <li><span className="invalid" id="invalidName">Name is required/Not exceeding 20 characters</span></li>
                    <li>
                        {/* <label>Email :</label> */}
                        <input type="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Enter your Email ..."/>
                        </li>
                    <li><span className="invalid" id="invalidEmail">Email Id should be valid!</span></li>
                    <li>
                        {/* <label>Contact :</label> */}
                        <input type="text" maxLength="10" id="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Enter your Contact ..."/>
                        </li>
                    <li><span className="invalid" id="invalidMobile">Mobile should be 10 digit/Invalid!</span></li>
                    <li>
                        {/* <label>Preferred Languages:</label> */}
                        <input type="text" max="10" id="lang" value={this.state.lang} onChange={this.handleChange} placeholder="Languages you prefer..."/>
                        </li>
                   
                    <li><input type="submit" max="10" id="submit" onClick={this.validate} value="SUBMIT"/></li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}
export default SignIn;