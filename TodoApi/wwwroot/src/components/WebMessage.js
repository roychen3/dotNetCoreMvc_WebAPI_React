import React, { Component } from 'react'

export class WebMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let message = this.props.message;

        return (<div className="message-model">
            {message}
        </div>
        );
    }
}

export default WebMessage
