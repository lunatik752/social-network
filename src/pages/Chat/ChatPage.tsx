import React, {useEffect, useState} from "react";
import style from './Messages.module.css'
import {useSelector} from "react-redux";
import {message} from "antd";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

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

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessage) => [...prevMessage, ...newMessages])
        })
    }, [])

    return (
        <div className={style.messagesWrapper}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}

        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img src={message.photo} alt='photo'/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>

    )
}

const AddMessageChatForm: React.FC = () => {

    const[textMessage, setTextMessage] = useState('')

    const sendMessage = () => {
        if (!textMessage) {
            return
        }
        ws.send(textMessage)
        setTextMessage('')
    }

    return (
        <div>
            <div>
                <textarea
                    onChange={(e) => setTextMessage(e.currentTarget.value)}
                    value={textMessage}/>
            </div>
            <div>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}
