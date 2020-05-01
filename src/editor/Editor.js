import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../Helper.js';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles.js';

//this is the place where you edit the body and title
class Editor extends React.Component{
	//that is why we have text an d tile in state with an id
	constructor(){
		super()
		this.state ={
			text:"",
			title:"",
			id:"",
		}
	}
	//when the editor component mount it shows the selected note
	componentDidMount(){
		this.setState({
			text:this.props.selectedNote.body,
			title:this.props.selectedNote.title,
			id:this.props.selectedNote.id
		})
	}
	//when updated 
	//another item is selected it shows the data of this new note
	componentDidUpdate(){
		//we first endure that the note selected is not the same as as the selected one
		//that is  selecting the same note
		if(this.props.selectedNote.id !==this.state.id){
			this.setState({
			text:this.props.selectedNote.body,
			title:this.props.selectedNote.title,
			id:this.props.selectedNote.id
		})
		}
	}
	render(){
		const {classes} = this.props
		return(
			<div className={classes.editorContainer}> 

			<input 
			className={classes.titleInput}
			placeholder ='Note title'
			value={this.state.title ? this.state.title: ''}
			onChange={(e)=> this.updateTitle(e.target.value)}
			 />
		 <EditIcon className={classes.editIcon}/>
			
			<ReactQuill 
			value={this.state.text} 
			onChange={this.updateBody}>
			</ReactQuill>
			</div>
			)
	}
	//updates the body
	updateTitle =async(val)=>{
   //this function is async such that it can update title before it updates the state
	await this.setState({title :val});
	this.update()

	}
	//updates the body
	updateBody = async(val) =>{
  //this function is async such that it can update title before it updates the state

		await this.setState({text :val});
		this.update()
	}
	//so before updatin we wait for 1.5s after the user is done typing
	update = debounce(()=>{
		//after waiting we pass it as props to the app function in the noteUpdate
     //console.log("updating database")
     this.props.noteUpdate(
     	{ id:this.state.id,
     	  title:this.state.title,
     	   body:this.state.text,
     	})
	},1500)
}
export default withStyles(styles)(Editor)