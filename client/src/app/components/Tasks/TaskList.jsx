import React from 'react';
import _ from 'lodash';
import { Button } from 'reactstrap';
import TaskItem from './TaskItem';
import FormControl from '../FormControl';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);

        this.state = {
            newItem: null,
            items: []
        };
    }

    componentDidMount() {
        this.setState({
            items: this.getStoredList()
        })
    }

    getStoredList() {
        return JSON.parse( localStorage.getItem('ToDoList') ) || [];
    }

    handleChange(e) {
        this.setState({
            newItem: e.target.value
        })
    }

    addItem(e) {
        e.preventDefault();
        
        let savedItems = this.getStoredList();

        savedItems.push({
            id: btoa(`${this.state.newItem} ${new Date()}`),
            label: this.state.newItem,
            completed: false,
            created: new Date()
        });
        
        e.target.reset();
        this.saveList(savedItems);
    }

    markItem(id) {
        let savedItems = this.getStoredList();
        let index = _.findIndex(savedItems, {id: id});
        savedItems[index].completed = !savedItems[index].completed;
        this.saveList(savedItems);
    }

    saveList(listArray = []) {
        this.setState({
            newItem: null,
            items: listArray
        }, () => {
            localStorage.setItem('ToDoList', JSON.stringify( listArray ) );
        });        
    }

    deleteItem(id) {
        let savedItems = this.getStoredList();
        let index = _.findIndex(savedItems, {id: id});
        if ( index > -1 ) {
            savedItems.splice(index, 1);
            this.saveList(savedItems);
        }
    }

    render() {
        return (
            <div id="task-list-container">
                <h1>Task List</h1>

                <form id="add-new-item" className="form-inline" onSubmit={this.addItem}>
                    <FormControl
                        type="text"
                        id="new-item"
                        label="Add a new task"
                        onChange={this.handleChange}
                        value={this.state.newItem}
                    />
                    <Button
                        type="submit"
                        color="success"
                        disabled={!this.state.newItem}
                    >Add</Button>
                </form>

                { !this.state.items.length ? <p className="h3 text-center">No tasks...</p> : null }

                <ul id="task-list">
                    {
                        this.state.items
                            .sort( (a,b) => a.completed-b.completed )
                            .map((item, index) => 
                                <TaskItem
                                    {...item}
                                    onChange={() => this.markItem(item.id)}
                                    deleteHandler={() => this.deleteItem(item.id)}
                                    key={index}
                                />
                            )
                    }
                </ul>
            </div>
        );
    }
}