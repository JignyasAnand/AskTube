import React from "react";
import { useState, useEffect } from "react";

const Chat = ({ link }) => {
  // const [ytlink, setYtLink] = useState(link);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const clickHandler = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
      }),
    };

    try {
      const resp = await fetch("http://127.0.0.1:8000/response", options);
      const data = await resp.json();
      setMessage(data.assistant);
    } catch (error) {
      console.log(error);
    }
    // setQuestion("");
  };

  useEffect(() => {
    console.log(currentTitle, question, message);
    if (!currentTitle && question && message) {
      setCurrentTitle(question);
    }
    if (currentTitle && question && message) {
      setPreviousChats([
        ...previousChats,
        {
          title: currentTitle,
          role: "user",
          message: question,
        },
        {
          title: currentTitle,
          role: "assistant",
          message: message,
        },
      ]);
    }
    console.log(previousChats);
  }, [message, currentTitle]);
  // useEffect(()=>{
  //   setPreviousChats=[]
  // }, [ytlink])
  console.log(previousChats);

  return (
    <div style={{ height: "800px" }} className="flex flex-col">
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {previousChats && (
          <ul>
            {previousChats.map((item, ind) => {
              const userChat = (
                <li
                  key={ind}
                  className="bg-[#1db847] rounded-xl rounded-br-none my-4 p-2"
                  style={{ wordWrap: "break-word" }}
                >
                  {item.message}
                </li>
              );
              const assistChat = (
                <li
                  key={ind}
                  className="bg-[#5696e3] rounded-xl rounded-bl-none my-4 p-2"
                  style={{ wordWrap: "break-word" }}
                >
                  {item.message}
                </li>
              );
              return item.role === "assistant" ? assistChat : userChat;
            })}
          </ul>
        )}
      </div>
      <div className="flex w-full gap-3 bottom-0">
        <input
          className="p-2 border-2 rounded-2xl border-black text-center w-[85%]"
          //   placeholder="Ask any question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <button
          className="bg-[#428af5] rounded-2xl text-xl font-bold text-white w-[15%]"
          onClick={clickHandler}
        >
          ASK
        </button>
      </div>
    </div>
  );
};

export default Chat;
