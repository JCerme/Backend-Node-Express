import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../contexts/LoginContext'
// import io from 'socket.io-client'

// const socket = io('http://localhost:8081', {
//     withCredentials: true,
// });
export const Chat = () => {
    const [messages, setMessages] = useState([])
    const { user } = useContext(LoginContext)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/chat`)
        .then(res => res.json())
        .then(data => setMessages(data?.payload))
        .catch(error => console.error('Hubo un problema con la operación fetch: ', error))
    }, [])

    useEffect(() => {
        socket.on('message', (msg) => setMessages([...messages, msg]))

        socket.on('error', (error) => {
            console.log(error)
        })

        socket.on('success', (success) => {
            console.log(success)
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        const message = document.getElementById('msg').value
        if (message && user?._id) {
            socket.emit('message', {
                user: user.first_name + ' ' + user.last_name,
                user_id: user._id,
                message: message
            })
            document.getElementById('msg').value = ''
        }
    }

    return (
        <>
            <h1 className="w-full text-center text-4xl font-bold my-16">
                CHAT
            </h1>
            <div className="max-w-[768px] mx-auto pb-[100px] px-4 md:px-0">
                <div id="messages">
                    {messages.map((msg, index) => (
                        <div key={(msg.user_id + '_' + index)} className={
                            (msg?.user_id && msg?.user_id === user?._id
                            ? 'bg-blue-600 text-white ml-auto '
                            : 'bg-gray-100 mr-auto ') +
                            "w-[60%] relative rounded-lg py-4 px-6 leading-5 my-4 md:my-6"
                        }>
                            <span className="text-xl font-bold">{msg.user}</span>
                            <p>{msg.message}</p>
                            <span className="absolute bg-white -bottom-1 -right-1 text-sm text-gray-400 border-[1px] border-border-solid border-gray-200 p-1 px-4 rounded-full">
                                {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    ))}
                </div>
                <form id="inputMsg" onSubmit={(e) => sendMessage(e)}>
                    <div className="w-full fixed bottom-4 md:bottom-8 left-0">
                        <div className="relative w-[calc(100%-2rem)] md:w-[768px] mx-auto">
                            <input id="msg" name="msg" type="text"
                            className="rounded-lg w-full py-4 px-6 bg-gray-100 leading-5 border"
                            placeholder="Write your message..."></input>
                            <button type="submit" id="sendMsg" className="h-[calc(100%-1rem)] aspect-square bg-blue-600 absolute right-2 rounded-lg top-1/2 -translate-y-1/2">
                                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
