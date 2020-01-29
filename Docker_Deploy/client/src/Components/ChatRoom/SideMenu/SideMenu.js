import React, { Fragment } from 'react';
import './sidemenu.css';
const SideMenu = () =>{
    return(
        <Fragment>
         <div className="menu-container">
            <div className="channels">
                <ul>
                <li><h4>Channels</h4></li>
                <li>#codingmart</li>
                </ul>
            </div>
            <div className="search">
                <input type="text" placeholder="Jump to" name="search"/>
            </div>
            <div className="user-menu">
                <ul>
                    <li><h4>Direct Messages <button className="add-icon">+</button></h4></li>
                </ul>
            </div>
            <div>
         
         </div>
         </div>   
        
         
        </Fragment>
    )
}
export default SideMenu;