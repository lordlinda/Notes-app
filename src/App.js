import React from 'react';
import  "./App.css"
import Sidebar from "./sidebar/Sidebar.js"
import Editor from "./editor/Editor.js"
import ls from "local-storage"

class App extends React.Component{
//we initialise the notes an empty array 
//the selectedNoteIndex and selected note are null since we havent selected any note
	constructor(){
		super()
		this.state = {
			selectedNoteIndex:null,
			selectedNote:null,
			notes:[],
      
		}
	}
  //in this componentDid Mount is where the local storage goes so that
  //when you  re-open your browser the items you placed in are still there
   componentDidMount(){
    //console.log(this.state.notes)
    //this ensures that the notes are initialised in the local storage
    this.setState({
      notes : ls.get('notes') || []
    })
}
 render(){
  //we destructure the state for easier use
 	const {selectedNoteIndex,notes,selectedNote} =this.state

  //console.log(notes)
   return (
   	<div className="app-container">
    {/*the sidebar component takes in the index of the note selected,
    //the select note to dislay it in the editor
    //delete note to  get the note to be deleted
    //the new note to get data for the new note 
    //and the notes displayed in it
  */}
   	<Sidebar 
    notes={notes} 
    selectedNoteIndex={selectedNoteIndex}
    deleteNote={this.deleteNote}
    selectNote={this.selectNote}
    newNote={this.newNote}
     />
   {/*the editcr component only showss up on selecting a note 
   that is what this ternary operator needs
   otherwise it wont show
 */}
     {
      this.state.selectedNote  ?
       <Editor 
      selectedNote={selectedNote}
      selectedNoteIndex={selectedNoteIndex}
      notes={notes}
      noteUpdate={this.noteUpdate}
     /> :null
     }
 </div>
   	)
 }
   ///a note is selected using this select note function
   ///such that it can be displayed in the editor component
 
selectNote =(note,index)=>{
  //this function picks up the note and its index and sets it equal to 
  //the selectedNote and selectedNote index therefore showing up in
  //the editor component
  this.setState({
    selectedNoteIndex:index,
    selectedNote:note
  })
}

//this is what allows you to update the text in the note 
//and be effected in the state

noteUpdate =(noteObj)=>{
 /// console.log(noteObj)
 /// so what i do is to return all the other notes except the one i want 
 /// to update using the spread operator
 /// so i return a new obj inits place with new title
this.setState((state)=>({
  notes :[
    noteObj,
    ...state.notes.filter(note => note.id !== noteObj.id),  
  ]
}))
//console.log(this.state.notes)
ls.set('notes',this.state.notes)
 }
// the function is async to update the state write after sometime beacuse of the debounce function
 deleteNote =async(note)=>{
  //console.log(note)
  //the first case is incase the note in we want to delete is the one we selected
  //we need the index so we look for the index of this note we want to delete in the notes array
const noteIndex = this.state.notes.indexOf(note)
//console.log(noteIndex)
if(this.state.selectedNoteIndex === noteIndex){
  //so this is to ensure that we set the selectedNodeIndex and selectedNote to null
  //such that it doesnt appear in the editor any more
  this.setState({selectedNote:null,selectedNoteIndex:null})
  //after that i pick the id of the selected note and declare it
   const id =note.id;
   await  this.setState({
  notes :this.state.notes.filter(note => note.id !== id)
})//
  //console.log(this.state.notes)
  ls.set('notes',this.state.notes)
}else{
  //in this case if the array of notes is longer than one
  //we just select the next object as selectedNote
  this.state.length > 1 ?
  //we selected note becomes the one in the notes array whose index is less by one as the array has reduced
  //the selectednoteIndex is the indexof the one deleted minus one
  this.selectNote(this.state.notes[this.state.selectedNoteIndex -1],this.state.selectedNoteIndex - 1)
  //if the list item was only one and it goes we cant slected any so the selectedNote and the selectedNoteIndex is null
  :   this.setState({selectedNote:null,selectedNoteIndex:null})
  //repeat the same procedure by filtering out the one with id of the note seleected
  const id =note.id;
 await this.setState({
  notes :this.state.notes.filter(note => note.id !== id)
})
  //console.log(this.state.notes)
    ls.set('notes',this.state.notes)
}
//else ends here

 }//delete function ends here

//this function captures a new note and adds it to the array
//it comes with a title from the sidebar component
 newNote = async(title) =>{
  //we create the new object an id you know to make it look cool
  ///so far the body is empty
    const note ={
      id:Math.floor(Math.random()*100),
      title:title,
      body:'',
    };

const newId =Math.floor(Math.random()*100)
await this.setState({notes:[note,...this.state.notes]})
//we ensure that we update local storage everytime we set state
    ls.set('notes',this.state.notes)
//to ensure that on creating a new note it is opened in the note editor,we get 
//its position in the array of notes and since we want to match this new note with itself 
//in the array and since it is one ,we know its index is zero
 const newNoteIndex= this.state.notes.indexOf(this.state.notes.filter(note => note === note)[0])
 //console.log(newNoteIndex)
 await this.setState({selectedNote:this.state.notes[newNoteIndex],selectedNoteIndex:newNoteIndex})
    ls.set('notes',this.state.notes)
 }

 }

export default App;
