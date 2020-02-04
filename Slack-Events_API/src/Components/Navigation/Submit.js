import React from "react";

class Submit extends React.Component {
    state = {msg:"",
image:null  }
    handleMsg = e => {
        e.preventDefault();
      this.setState({
        msg: e.target.value
      });
    }
      handleImage = event =>{
        event.preventDefault();
    this.setState({
      image: event.target.files[0]
    });
  }
  submit=()=>{
      this.props.submit(this.state.msg,this.state.image)
      this.setState({
        msg:"",
        image:null
      })
  }
    render()
     { 
        return (  
            // <Fragment>
                 <div className="message-footer">
          <div className="msg-form">
            <div className="inputs">
              <input
                type="text"
                className="control msg-input"
                onChange={this.handleMsg}
                value={this.state.msg}
                placeholder="Type something"
                required="true"
              />
              <input
                type="file"
                name="image"
                accept="*"
                enctype="multipart/form-data"
                id="avatar"
                onChange={this.handleImage}
              />
              <button onClick={this.submit}>Send Message</button>
            </div>
          </div>
        </div>
        // </Fragment>
            
        );
    }

}
export default Submit;