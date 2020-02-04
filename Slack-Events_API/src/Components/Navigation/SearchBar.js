import { Fragment } from "react";
import TextField from '@material-ui/core/TextField';
import React from 'react';
class SearchBar extends React.Component {
    state = {  }
    handleQuery =(e)=>{
        this.props.searchQuery(e.target.value)

    }

    render() { 
        return (
            <React.Fragment>
                <TextField label="Search Chat Here" id="standard-size-normal" defaultValue="" onChange={this.handleQuery} />
            </React.Fragment>
          );
    }
}
 
export default SearchBar;