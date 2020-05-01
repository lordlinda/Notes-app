import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles.js';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/SidebarItem.js';

//this component is the side where we have our notes items
class Sidebar extends React.Component{
	//in this case we are going to have to create a new list item with just
	//a title and create a body hence the state
	//initially the title and adding note are not operating 
	//they will be use later in ina ternary opeartor
	constructor(){
		super()
		this.state ={
			addingNote:false,
			title :null,
		}
	}
	render(){
		//destructuring
		const {notes,classes,selectedNoteIndex} = this.props
		//this function only runs if the notes exist as intitaially is an empty array
		if(notes){
		return (
			<div className ={classes.sidebarContainer}>
		    <Button onClick={this.newNoteBtnClick}
		    className={classes.newNoteBtn}
		    //the text is based is whether the addingNote is true or flase
		    >{this.state.addingNote ? "Cancel" :"New Note"}</Button>
		 
		    {
		    	this.state.addingNote ? 
		    	<div>
		    	<input type="text" 
				className={classes.newNoteInput}
				placeholder="Enter  note title"
				onKeyUp ={(e)=>this.updateTitle(e.target.value)}
		    	/>
		    	<Button className={classes.newNoteSubmitBtn} 
		    	onClick={this.newNote}>
		    	Submit Note
		    	</Button>
		    	</div>:
		    	null
		    }
		    <List>
		    {
		    	notes.map((_note,_index) =>{
		    		//console.log(_index)
		    		///this is the individual item 
		    		return(
		    			<div key={_index}>
		    				<SidebarItem 
		    				_note={_note} 	
		    				_index={_index}
		    				selectedNoteIndex={selectedNoteIndex}
		    				selectedNote={this.selectNote}	
                            deleteNote={this.deleteNote}
		    				/>
		    				<Divider></Divider>
                       </div>
		    			)
		    	})
		    }

		    </List>
			</div>
			)
	}
	}
	//on clicking the new note button,the addingNote is true
	newNoteBtnClick =() =>{
		//to ensure that every time the title is clicked we dont have the previous tile we 
		//set the title back to null
		this.setState({addingNote :!this.state.addingNote,title:null})
		//console.log("btn clicked")
	}
	updateTitle =(txt)=>{
			this.setState({title:txt})
	}
	//passing props from siderbar item then to app.js
	newNote =()=>{
		this.props.newNote(this.state.title);
		this.setState({title:null,addingNote:false})
	}
		//passing props from siderbar item then to app.js
	selectNote = (note,index) =>this.props.selectNote(note,index)
	deleteNote = (note) =>this.props.deleteNote(note)

}
export default withStyles(styles)(Sidebar)