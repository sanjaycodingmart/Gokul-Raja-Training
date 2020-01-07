import React, { Fragment, Component } from 'react';
import firebase from '../firebase.js';
import EntriedTable from './UserShowTable.js';
class UserTables extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            fileKeys:[],
            fileValues:[],
            received:false,
            responded:false,
            titles:[],
            file:""
        }
        this.getRespond=this.getRespond.bind(this);
        this.data=null;
        this.objResponse={}
    }
    componentDidMount(){
        let user=localStorage.getItem("user")
        let refer=firebase.database().ref(user+'/files');
        refer.on('value',(snapshot)=>{
            let fileValue=snapshot.val();
            let filelist=Object.keys(fileValue);
            let fileValues=Object.values(fileValue);
            this.setState({
                fileKeys:filelist,
                fileValues:fileValues,
                received:true
            })
   
           
        })
        

    }
    processTitles(titles){
        let templateArray=[];
        let titless=Object.keys(titles[0])
        for(let title in titless) {
          let templateObject={
            "Header":"",
            "accessor":""
          }
          templateObject.Header=titless[title];
          templateObject.accessor=titless[title];
          templateArray.push(templateObject);
        };
        return templateArray
  }
    async  getRespond (e){
        let index=e.target.id;
        alert(index);
        let titled=await JSON.parse(this.state.fileValues[index].filed);
        this.data=titled;
        let titleRespond=await this.processTitles(titled);
        let responded=Object.keys(titled[0]);
        responded.forEach(element => {
            this.objResponse[element]=""
          });
          this.setState({
            file:this.state.fileKeys[index],
              responded:true,
              titles:titleRespond,
              
          })
    }
    render(){
    return(
        <Fragment>
        <p><b>The Files List Are Given Below! Click to edit</b></p>
        {this.state.received && this.state.fileKeys.map((value,index)=>{
            return(<button style={{margin:10}} key={index} id={index} onClick={this.getRespond}>{value}</button>)
        })}
        {this.state.responded && <EntriedTable titles={this.state.titles} data={this.data} respond={this.objResponse} row={this.state.fileValues.length} file={this.state.file} user={this.props.user}/>}
        
        </Fragment>
    )
}}
export default UserTables;