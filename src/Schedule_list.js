import React from 'react';
import './Schedule_list.css';
import Delete_icon from "./delete.png";
import * as feather from "react-feather";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};



class Schedule_list extends React.Component {


  state = {
    modalIsOpen: false,
    title: "",
    description: "",
    time: "",
    date:"",
    data: [],
    edit: false,
    indexToUpdate: null,
    errorState: false,
    
  }

  openModal() {
   
    this.state.modalIsOpen = true;
    this.setState(this.state)
    
  }

 
  closeModal() {
  this.state.errorState = false
    this.state.modalIsOpen= false
      this.state.indexToUpdate=null
      this.state.edit= false
      this.state.title= ""
      this.state.time= ""
      this.state.description= ""
      this.state.date = ""
    this.setState(this.state)
    
  }
 
  Submit_datas() {
   
  
    if (this.state.title !="" && this.state.description != "" && this.state.date != "" &&  this.state.time != "") {
      let obj = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
     
    };
    
    // let { data } = this.state;
    let data = this.state.data;
    if (this.state.edit) {
      this.delete_schedule_list(this.state.indexToUpdate)
      data.splice(this.state.indexToUpdate, 0, obj)
      
    }
    else {
      data.push(obj);
    }
   
    this.setState({ data: data, });
    this.closeModal()
    }
    else {
      this.state.errorState = true;
       this.setState(this.state)
    }
  }

  
  handleChange=(event)=> {
    
    this.setState({ [event.target.name]: event.target.value });
  }
  
  delete_schedule_list = (index) => {
    
    this.state.data.splice(index, 1);
    this.setState(this.state)
  }

  editList = (Element,index) => {
    this.state.indexToUpdate = index
    this.state.edit = true;
    this.state.modalIsOpen = true;
    this.state.title = Element.title;
    this.state.time = Element.time;
    this.state.description = Element.description;
    this.state.date = Element.date;
    this.setState(this.state)
  }
    render() {
      
    return (
      <div>
        <div className="header_box">
          <h1 className="title_header_box">EVENT LIST</h1>
          <button className="close_button_header_box" onClick={()=>this.openModal()}>Open Modal</button>
        </div>
        <div>
          {
            this.state.data.length === 0 ?
              <div>
                {/* <table>
                  <tr>
                    <th>EVENT NAME</th>
                    <th> DATE</th>
                    <th> TIME</th>
                    <th>DESCRIPTION</th>
                    <th>action</th>
                  </tr>

                </table> */}
                <h1>No Events to Show </h1>
             </div>  
              :
              <div>
                <table>
                  <tr className="tableRow">
                    <th>TITlE</th>
                    <th> DATE</th>
                    <th> TIME</th>
                    <th>DESCRIPTION</th>
                    <th>ACTION</th>
                  </tr>

                    
                {
                  this.state.data.map((Element, index) => (
                        
                    <tr>     
                      <td>{Element.title}</td>
                      <td>{Element.date}</td>
                      <td>{Element.time}</td>
                      <td>{Element.description}</td>
                      {/* <td><span onClick={()=>this.editList(Element,index)}>edit</span><img onClick={() => this.delete_schedule_list(index)} src={Delete_icon} width="20px" height="20px"></img></td> */}
                      <td><feather.Edit onClick={()=>this.editList(Element,index)}/><feather.Trash2 onClick={() => this.delete_schedule_list(index)}/></td>
                    </tr>
                  ))}
              </table>
              </div>
           } 
        </div>
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        > */}
        {this.state.modalIsOpen == true ? 
          <div>
          <div id="popupContainer">
          
              <div className="popup_header">
                <h3 className="title_popup_header" >Create New Event</h3>
                <button className="close_popup_header" onClick={()=>this.closeModal()}>close</button>
              </div>
              <div className="popup_datagrid">
                <h2 className="titles_popup_datagrid">Event Title</h2>
                <input
                  placeholder="Event Title"
                  onChange={event => this.handleChange(event)}
                  name="title"
                  value={this.state.title}
                ></input>
             
              
               
                <h2 className="titles_popup_datagrid">Time</h2>
                <input
                  type="time"
                  onChange={event => this.handleChange(event)}
                  name="time"
                  value={this.state.time}

              ></input>
              <h2 className="titles_popup_datagrid">Date</h2>
              <input
                type="date"
                onChange={event => this.handleChange(event)}
                name="date"
                value={this.state.date}

              ></input>
              <h2 className="titles_popup_datagrid">Event Description</h2>
              <input
                placeholder="Report Name"
                onChange={event => this.handleChange(event)}
                name="description"
                value={this.state.description}
              ></input>
              
              <button style={{marginLeft:"238px"}} onClick={() => { this.Submit_datas() }}>{this.state.edit ? "Update" : "Save"}</button>
              </div>
              <p className="error">{this.state.errorState ? "Please Fill All The Fields" :""}</p>
            </div>
              </div>
          : 
          ""
           }
                  {/* </Modal> */}
      </div>
    );
  }
}

export default Schedule_list;