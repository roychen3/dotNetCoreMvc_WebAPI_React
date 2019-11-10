import React, { Component, Fragment } from 'react'
import GetTodo from './GetTodo'

export class AddTodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: ''
        };

        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleAddChange(event) {
        this.setState({
            newItem: event.target.value
        });
    }

    handleAddClick(event) {
        event.preventDefault();
        this.addItem();
    }

    addItem() {
        const item = {
            isComplete: false,
            name: this.state.newItem
        };

        let url = "api/TodoItems";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                // this.setState({ newItem: '' });
                this.props.reGetTodo();
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    render() {
        return (
            <div className="add-form">
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Add</span>
                    </div>
                    <input type="text" id="add-name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="New to-do" onChange={this.handleAddChange} value={this.state.newItem} />
                    <div className="input-group-append">
                        <button className="add-button btn btn-outline-secondary" onClick={this.handleAddClick}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddTodoItem
