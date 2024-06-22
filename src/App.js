import React, { useState, useEffect, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Import PrismJS CSS
import CodeResponse from "./CodeResponse"; // Import CodeResponse component

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const surpriseOptions = [
    "What is the best way to make a frittata?",
    "What is new in Medicare in 2024?",
    "What is the best place to visit in Ireland?",
    "When is Mardi Gras?",
    "What are the fundas?"
  ];

  const surprise = () => {
    const randomValue = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomValue]);
  };

  function autoResizeInput() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }

  const getResponse = async () => {
    if (!value) {
      setError("Please enter a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setLoading(false);

      let formattedResponse = "";

      if (data.startsWith("**")) {
        formattedResponse = data;
      } else {
        formattedResponse = `**Bot:** ${data}`;
      }

      const formattedUserMessage = `**You:** ${value}`;

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: formattedUserMessage,
        },
        {
          role: "model",
          parts: formattedResponse,
        },
      ]);

      setValue("");
      setError("");
      textareaRef.current.style.height = "auto";
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const clear = () => {
    setChatHistory([]);
    setValue("");
    setError("");
    textareaRef.current.style.height = "auto";
  };

  useEffect(() => {
    Prism.highlightAll();
    var lastUserMessage = document.getElementById('last');
    lastUserMessage && lastUserMessage.scrollIntoView(
      {block: "start", inline: "start", behavior: "smooth"});
  }, [chatHistory]);

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          I'm feeling lucky
        </button>
        {chatHistory.length !== 0 && <button className="clear" onClick={clear}>Clear</button>}
      </p>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          placeholder=""
          onChange={(e) => {
            setValue(e.target.value);
            autoResizeInput();
          }}
        />
        {!error && value && <button onClick={getResponse}>Submit</button>}
        {loading && <div style={{width: "30px", margin: "auto"}}>
            <TailSpin color="green" /></div>
        }
      </div>
      {error && <p className="error">{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <div className="message">
              {chatItem.role === "user" ? (
                <div className="user-message">
                  <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                  {index === chatHistory.length - 2 && <span id='last'/>}
                </div>
              ) : chatItem.parts.startsWith("```") ? (
                <CodeResponse code={chatItem.parts} />
              ) : (
                <div className="bot-message">
                  <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                </div>
              )}
            </div>
            {index !== chatHistory.length - 1 && <div className="message-gap" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
