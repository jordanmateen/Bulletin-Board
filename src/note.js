import React, {Component} from 'react' //importing react from react (using components)
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';


// creating note component to render.
class Note extends Component {  

    constructor(props){  // constructor to control state and binds
        super(props)
        
        // creating my default state editing is false
        this.state = {
            editing : false
        }

        // binding event handler methods to component instance 
        // here were are able to pass methods as callbacks
        this.edit =  this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.save = this.save.bind(this)
        this.randomBetween = this.randomBetween.bind(this)
    }

    
    componentWillMount(){
        this.style ={
            right: this.randomBetween(0,window.innerWidth-150, 'px'),
            top: this.randomBetween(0,window.innerWidth-150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }
    randomBetween(x ,y ,s){
        return x + Math.ceil(Math.random() * (y-x))+ s
    }

    componentDidUpdate(){
        var textarea
        if(this.state.editing){
            textarea = this._newText
            textarea.focus()
            textarea.select()
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
    }

    //Edit , remove and save event handlers will handle all actions that for posted note
    edit(){
        this.setState({  //changing state on edit to new state
            editing:true
        })
    }

    //Remove

    remove() {
        alert('Removing Note')
        this.props.onRemove(this.props.index)
    }

    //Save 

    save(e){
        // alert(this._newText.value) //capturing value from from
        e.preventDefault() //prvent default dbehavior of form
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false
        })
    }

    //render form on posted note is edit state is set to true
    renderForm(){
        return(
            <div className = "note" style = {this.style}>
                <form onSubmit = {this.save}>
                    <textarea ref = {input => this._newText= input} defaultValue = {this.props.children}/> {/**this for takes in call back function so we can get value from UI element*/}
                    <button id = "save">Save</button>
                </form>
                
            </div>
        )
    }

    
    //render posted note

    renderDisplay(){
        return(
            <div className = 'note' style = {this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick = {this.edit} id = "edit"><FaPencilAlt/></button>
                    <button onClick = {this.remove} id = "remove"><FaTrashAlt/></button>

                </span>
            </div>
        )

    }

    // this render function handles the state in which that if the edit state is changed to true it will render the edit form
    // else it will render the posted note as normal
    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay()
    }
}

export default Note