import React, { Component, Fragment } from 'react'

export class EditItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemId: "0",
            isComplete: false,
            editItem: ""
        }

        this.handleIsCompleteChange = this.handleIsCompleteChange.bind(this);
        this.handleIsEditChange = this.handleIsEditChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.itemId !== nextProps.itemId) {
            this.setState(state => ({
                itemId: nextProps.itemId,
                isComplete: nextProps.isComplete,
                editItem: nextProps.name
            }));
        }
    }

    handleIsCompleteChange(event) {
        this.setState({ isComplete: event.target.checked });
    }

    handleIsEditChange(event) {
        this.setState({ editItem: event.target.value });
    }

    handleUpdateClick(event) {
        event.preventDefault();
        this.updateItem();
    }

    updateItem() {
        const itemId = this.state.itemId;
        const item = {
            id: parseInt(itemId, 10),
            isComplete: this.state.isComplete,
            name: this.state.editItem
        };

        let url = "api/TodoItems";
        fetch(`${url}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(() => this.props.reGetTodo())
            .catch(error => console.error('Unable to delete item.', error));

        // closeInput();

        return false;
    }

    render() {
        return (
            <div className="edit-form">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Edite</span>
                    </div>
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" className="edit-isComplete" checked={this.state.isComplete} onChange={this.handleIsCompleteChange} />
                        </div>
                    </div>
                    <input className="edit-name form-control" value={this.state.editItem} onChange={this.handleIsEditChange} />
                    <div className="input-group-append">
                        <button className="save-button btn btn-outline-secondary" onClick={this.handleUpdateClick}>save</button>
                    </div>
                {/* <a className="close">&#10006;</a> */}
                </div>
            </div>
        )
    }
}

export default EditItem
