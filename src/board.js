import React ,{Component} from 'react' // importing react component
import Note from './note' // importing notes

/// creating component for board
class Board extends Component{

    //building constructor for event handling binds and default state 
    constructor(props){
        super(props)
        this.state ={
            notes:[]
        }
        this.add = this.add.bind(this);
        this.eachNote = this.eachNote.bind(this);
        this.update = this.update.bind(this);
        this.nextId = this.nextId.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentWillMount(){
        var self = this;
        if(this.props.count){
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
                .then(response => response.json())
                .then(json => json[0]
                              .split('. ')
                              .forEach(sentence => self.add(sentence.substring(0,25))))
        }
    }

    add(text){
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                }
            ]
        }))
    }

    nextId(){
        this.uniqueId = this.uniqueId || 0 
        return this.uniqueId ++;
    }
    //updating notes 
    update(newText, i){
        console.log('updating item at' , i);
        //resetting state.
        this.setState(prevState =>({
            notes : prevState.notes.map(
                note => (note.id !== i) ? note :{...note, note: newText}
            )
        }))

    }

    remove(id){
        console.log('removing item at' , id);
        this.setState(prevState =>({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }
    // note event
    eachNote(note, i){
        return (
            <Note key = {note.id} 
                  index = {note.id} 
                  onChange = {this.update} 
                  onRemove = {this.remove}>{note.note}</Note>
        )
    }
    render(){
        return(

            <div className = 'board'>
                {this.state.notes.map(this.eachNote)} 
                <button onClick ={this.add.bind(null, "New Note")} id = "add"> ADD NOTE</button>
            </div>


        )
    }
}

export default Board