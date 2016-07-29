import React from 'react'

var Chat = React.createClass({
    getInitialState() {
        return {messages: []}
    },
    componentDidMount() {
        this.socket = io('localhost:8080')
        this.socket.on('chat:message', this.addMessage);
    },
    submit() {
        let input = $('#chat > div > input');
        if (input.val().length > 0) {
            this.socket.emit('chat:message', input.val())
            input.val('');
        }
    },
    addMessage(msg) {
        let cur_state = this.state;
        cur_state.messages.push(msg);
        this.setState(cur_state);
    },
    handleKeyPress(event){
        if(event.keyCode == 13){
            this.submit();
        }
    },
    render() {
        return (
            <div id='chat' className='container'>
                <ul className='row'>
                    {this.state.messages.map((message, index) => {
                        return (
                            <li key={index} className='message-item'>{message}</li>
                        )
                    })}
                </ul>
                <div className='row'>
                    <input onKeyUp={this.handleKeyPress}></input>
                    <button onClick={this.submit} className='btn btn-primary'>Submit</button>
                </div>
            </div>
        )
    }
})

export default Chat;
