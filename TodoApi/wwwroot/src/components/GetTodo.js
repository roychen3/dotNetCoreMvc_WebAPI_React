import React, { Component, Fragment } from 'react';
import WebMessage from './WebMessage';
import TodoItem from './TodoItem';
import AddTodoItem from './AddTodoItem'
import EditItem from './EditItem'

export class GetTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isError: false,
            webDatas: "",
            itemId: "0",
            isComplete: false,
            name: ""
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.updateTodoList = this.updateTodoList.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    updateTodoList() {
        this.getItems();
        this.forceUpdate();
    }

    getItems() {
        if (this.state.isLoading === false) {
            this.setState(state => ({ isLoading: true, isError: false }));
        }

        let url = "api/TodoItems";
        fetch(url)
            .then(function (response) { return response.json(); })
            .then((myJson) => {
                let resultDatas = myJson;
                this.setState(state => ({ isLoading: false, webDatas: resultDatas }));
            })
            .catch((error) => {
                console.log(error);
                this.setState(state => ({ isLoading: false, isError: true }));
            });
    }

    handleEditClick(id, isComplete, name) {
        this.setState(state => ({
            itemId: id,
            isComplete: isComplete,
            name: name
        }));
    }

    render() {
        let todoList;
        let message;
        if (this.state.isLoading) {
            console.log("loading...");
            message = <p id="message"><i className="fas fa-spinner"></i> 載入中</p>;
            todoList = <WebMessage message={message} />;
        }
        else {
            if (this.state.isError) {
                console.log("error");
                message = <p id="message"><i className='fas fa-exclamation-triangle'></i> 伺服器發生問題</p>;
                todoList = <WebMessage message={message} />;
            }
            else {
                console.log("success");
                let webDatas = this.state.webDatas;
                const todoItems = webDatas.map((item) => <TodoItem reGetTodo={this.updateTodoList} onEditClick={this.handleEditClick} key={item.id} id={item.id} name={item.name} isComplete={item.isComplete} />);

                const noDatas = (<div class="alert alert-light" role="alert">
                    There are no items.
              </div>);
                todoList = (<div>
                    <AddTodoItem reGetTodo={this.updateTodoList} />
                    <EditItem reGetTodo={this.updateTodoList} itemId={this.state.itemId} isComplete={this.state.isComplete} name={this.state.name} />

                    <h3>Todo List</h3>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">IsComplete</th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {webDatas.length > 0 ? todoItems : noDatas}
                        </tbody>
                    </table>




                    {/* <div className="todo-list">
                        <h3>Todo List</h3>
                        <div className="title-name">
                            <p>IsComplete</p>
                            <p>Name</p>
                        </div>
                        {webDatas.length > 0 ? todoItems : "There are no items."}
                    </div> */}
                </div>
                );
            }
        }

        return (todoList);
    }
}

export default GetTodo
