import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../Helper.js';

//this is the individual item of the the motes ie individual note
class SidebarItem extends React.Component{
	render(){
		const {_note,_index,classes,selectedNoteIndex} = this.props
		return (
			<div key={_index}>
			<ListItem 
			className={classes.listItem}
			selected={selectedNoteIndex === _index}
			alignItems='flex-start'
			>
			<div className={classes.textSection}
			onClick={()=>this.selectNote(_note,_index)}
			>
			<ListItemText 
 			primary={_note.title}
 			//this ensures that if the body text is longet than 30 characters it shows three dots
 			secondary={removeHTMLTags(_note.body.substring(0,30))+ '...'}
			></ListItemText>
			</div>
			<IconButton className={classes.deleteIcon} onClick={()=>this.deleteNote(_note)}>
			<DeleteIcon />
			</IconButton>
            </ListItem>
			</div>
			)
	}
	///this passes on the note selected to the sidebar item then to the app component
	selectNote =(note,index) => this.props.selectedNote(note,index);
	deleteNote =(note)=>{this.props.deleteNote(note)}
}
export default withStyles(styles)(SidebarItem)