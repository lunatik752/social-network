import React, {useEffect, useState} from "react";
import style from './Messages.module.css'
import { ChatMessageType } from "../../api/chat-api";



const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}
export default ChatPage


const Chat: React.FC = () => {

    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wsChannel: WebSocket
        const closeHandler = () => {
            console.log('close ws')
            setTimeout(createChannel, 3000)
        }


        createChannel()

        return () => {
            wsChannel.removeEventListener('close', closeHandler)
            wsChannel.close();
        }
    }, [])

    return (
        <div>
            <Messages ws={ws}/>
            <AddMessageChatForm ws={ws}/>
        </div>
    )
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws?.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessage) => [...prevMessage, ...newMessages])
        })
    }, [ws])

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

const AddMessageChatForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [textMessage, setTextMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        };
        ws?.addEventListener("open", openHandler)
        return () => {
            ws?.removeEventListener("open", openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!textMessage) {
            return
        }
        ws?.send(textMessage)
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
                <button onClick={sendMessage} disabled={ws === null || readyStatus !== 'ready'}>send</button>
            </div>
        </div>
    )
}
