import React, { Component } from 'react'

export class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleEditClick() {
        this.props.onEditClick(this.props.id, this.props.isComplete, this.props.name);
    }

    handleDeleteClick() {
        let id = this.props.id;
        let url = "api/TodoItems";
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
            .then(() => this.props.reGetTodo())
            .catch(error => console.error('Unable to delete item.', error));
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td><input type="checkbox" checked={this.props.isComplete} /></td>
                <td>{this.props.name}</td>
                <td><button className="edit-button btn btn-light" onClick={this.handleEditClick}>edit</button></td>
                <td><button className="delete-button btn btn-danger" onClick={this.handleDeleteClick}>delete</button></td>
            {/* <input type="checkbox" checked={this.props.isComplete} />
            <p>{this.props.name}</p>
            <button className="edit-button btn btn-light" onClick={this.handleEditClick}>edit</button>
            <button className="delete-button btn btn-danger" onClick={this.handleDeleteClick}>delete</button> */}
            </tr>

        
        );
    }
}

export default TodoItem
