import React, {useEffect, useState} from "react";
import style from './Messages.module.css'
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReduсer";
import {AppRootStateType} from "../../redux/store";


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}
export default ChatPage


const Chat: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch((startMessagesListening()))
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            <Messages/>
            <AddMessageChatForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector((state: AppRootStateType) => state.chat.messages)

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

    const [textMessage, setTextMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!textMessage) {
            return
        }
        dispatch(sendMessage(textMessage))
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
                <button onClick={sendMessageHandler} disabled={false}>send</button>
            </div>
        </div>
    )
}
