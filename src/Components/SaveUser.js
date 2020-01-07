import React, { Fragment } from 'react';
import { render } from '@testing-library/react';
export default function SaveUser(props){
    if(localStorage.getItem(props.name)){
        alert("User Exists")
    }
    else{
        localStorage.setItem(props.name,JSON.stringify(props));
        console.log(JSON.parse(localStorage.getItem(props.name)));
    }
    render()
    {
    
       return (<Fragment>
           
                </Fragment>)
    }
    
}