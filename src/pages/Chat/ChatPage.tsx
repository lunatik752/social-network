import React from "react";
import style from './Messages.module.css'

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage


const Chat: React.FC = () => {
    return (
        <div>
            <Messages/>
            <AddMessageChatForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = [1, 2, 3, 4]
    return (
        <div className={style.messagesWrapper}>
            {messages.map((m: any) => <Message/>)}
            {messages.map((m: any) => <Message/>)}
            {messages.map((m: any) => <Message/>)}
        </div>
    )
}

const Message: React.FC = () => {
    const message = {
        url: 'https://via.placeholder.com/30',
        author: 'Max',
        text: 'Hello'

    }

    return (
        <div>
            <img src={message.url} alt='photo'/> <b>{message.author}</b>
            <br/>
            {message.text}
            <hr/>
        </div>

    )
}

const AddMessageChatForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>send</button>
            </div>
        </div>
    )
}
