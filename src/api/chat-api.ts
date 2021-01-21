let subscribers = [] as SubscriberType[]

let wsChannel: WebSocket

const closeHandler = () => {
    console.log('close ws')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    wsChannel?.removeEventListener('close', closeHandler);
    wsChannel?.close();
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    wsChannel.addEventListener('close ', closeHandler)
}


export const chatApi = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return  () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    // второй вариант для отписки пользователя
    unSubscribe(callback: SubscriberType) {
            subscribers = subscribers.filter(s => s !== callback)
    }
}



type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
