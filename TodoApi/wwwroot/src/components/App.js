import React, { Component, Fragment } from 'react'
import GetTodo from './GetTodo'

export class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <span class="navbar-brand mb-0 h1"><h1>To-do CRUD App</h1></span>
                </nav>
                <GetTodo />
            </div>
        )
    }
}

export default App
