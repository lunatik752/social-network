import React, {useEffect, useRef, useState} from "react";
import style from './Messages.module.css'
import {ChatMessageApiType} from "../../api/chat-api";
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

    const status = useSelector((state: AppRootStateType) => state.chat.status)

    useEffect(() => {
        dispatch((startMessagesListening()))
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            {status === "error" && <div>Some error occurred. Please refresh the page</div>}
            <Messages/>
            <AddMessageChatForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const messages = useSelector((state: AppRootStateType) => state.chat.messages);

    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div className={style.messagesWrapper} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}> </div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageApiType }> = React.memo(({message}) => {

    return (
        <div>
            <img src={message.photo} alt='photo'/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>

    )
})

const AddMessageChatForm: React.FC = () => {

    const [textMessage, setTextMessage] = useState('');

    const status = useSelector((state: AppRootStateType) => state.chat.status)
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
                <button onClick={sendMessageHandler} disabled={status !== "ready"}>send</button>
            </div>
        </div>
    )
}
