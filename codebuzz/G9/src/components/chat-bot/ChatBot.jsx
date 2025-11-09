import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// Css
import "./ChatBot.scss"

// Image
// Light
import ChatbotLight from "../../assets/images/chat-bot/chatbot-light.svg";
import ChatbotCloseLight from "../../assets/images/chat-bot/chatbot-close-light.svg";
import AILight from "../../assets/images/chat-bot/ai-light.svg";
import ChatbotLogoLight from "../../assets/images/chat-bot/chatbot-logo-light.svg";
import SentLight from "../../assets/images/chat-bot/sent-light.svg";
// Dark
import AIDark from "../../assets/images/chat-bot/ai-dark.svg";
import ChatbotLogoDark from "../../assets/images/chat-bot/chatbot-logo-dark.svg";
import SentDark from "../../assets/images/chat-bot/sent-dark.svg";


import useThemeMode from '../../hooks/useThemeMode';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoChatBot } from '../../redux-Toolkit/services/ChatBotServices';

const initialState = [
    { type: "AI", msg: "Hi there! How can I help you?" },
]

const ChatBot = () => {

    const ThemeMode = useThemeMode();

    const dispatch = useDispatch();

    const ChatBot = useSelector((state) => state.ChatBot);
    const { loader, chatbotReply } = ChatBot;

    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState(initialState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        setMessages((prev) => [...prev, { type: 'User', msg: message }]);

        const res = await dispatch(reqtoChatBot({ message }));

        if (res.payload?.reply) {
            setMessage('');
        }
    }

    useEffect(() => {
        if (chatbotReply) {
            setMessages((prev) => [...prev, { type: "AI", msg: chatbotReply }]);
        }
    }, [chatbotReply]);

    useEffect(() => {
        const chatBox = document.querySelector(".chat_box");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;

            // chatBox.scrollTo({
            //     top: chatBox.scrollHeight,
            //     behavior: "smooth"
            // });
        }
    }, [messages, loader]);

    const handleChatToggler = () => {
        document.body.classList.toggle("show-chatbot");
        console.log("chat-now");

    }

    const handleChatRemove = () => {
        document.body.classList.remove("show-chatbot");
    }


    return (
        <>

            {/* ------ Chat-Bot Start ------ */}
            <button className="chatbot_toggler" onClick={handleChatToggler}>
                <img src={ThemeMode ? ChatbotLight : ChatbotLight} alt="Logo" className='toggler_img' draggable={false} />

                <img src={ThemeMode ? ChatbotCloseLight : ChatbotCloseLight} alt="Logo" className='toggler_img' draggable={false} />
            </button>

            <div className="chat_bot">
                <div className='title'>
                    {/* <img src={ThemeMode ? AILight : AIDark} alt="" className='img-fluid' />
                    <h2 className='mb-0'>G9 Jewellery</h2> */}

                    <img src={ThemeMode ? ChatbotLogoLight : ChatbotLogoDark} alt="" className='img-fluid' />
                </div>
                <div className="chat_box">
                    {/* <div className='message received'>
                        Hi there <br /> 
                        How  Can I help you ?
                    </div>
                    <div className='message sented'>
                        How are you?
                    </div> */}

                    {
                        messages?.map((i, index) => {
                            return (
                                <div className={`message ${i?.type === "AI" ? 'received' : 'sented'}`} key={index}>
                                    {i?.msg}
                                </div>
                            )
                        })
                    }

                    {loader && (
                        <div className="message received typing">
                            Typing...
                        </div>
                    )}
                </div>
                <div className="chat_input">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name='message'
                            placeholder='Ask your question...'
                            className='form-control'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            autoComplete='off'
                        />

                        <button
                            type='submit'
                            className='sent_btn'
                        >
                            <img src={ThemeMode ? SentLight : SentDark} alt="" className='img-fluid' />
                        </button>
                    </form>
                </div>
            </div>
            {/* ------ Chat-Bot End ------ */}


        </>
    )
}

export default ChatBot;