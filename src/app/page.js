"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import YoutubePlayer from "./components/YoutubePlayer";
import Chat from "./components/Chat";

const Page = () => {
  const [link, setLink] = useState("");
  const [input, setInput] = useState("");

  const changeLink = (e) => {
    setInput(e.target.value);
  };
  const clicked = () => {
    const params = new URLSearchParams(new URL(input).search);
    setLink(params.get("v"));
  };

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: link,
      }),
    };
    fetch("http://127.0.0.1:8000/prepare", options);
  }, [link]);

  return (
    <>
      <h2 className="text-6xl font-bold text-center mt-6">AskTube</h2>
      <div className="flex items-center mx-16 mt-10 justify-between gap-8">
        <div className="w-[90%]">
          <input
            className="w-full p-4 border-2 border-solid rounded-2xl border-black text-center text-xl"
            type="text"
            onChange={changeLink}
            placeholder="Enter Youtube Link"
          />
        </div>
        <div className="w-[10%]">
          <button
            type="submit"
            onClick={clicked}
            className="border-3 bg-black text-white text-xl font-bold p-4 rounded-2xl"
          >
            Get Video
          </button>
        </div>
      </div>

      <div className="flex w-full justify-start mt-16">
        <div className=" ml-16 w-[50%] border-2 p-8 rounded-2xl test">
          {!link && (
            <h2 className="text-3xl font-bold text-center">
              Please Enter A Youtube Link Above
            </h2>
          )}
          {link && (
            <YoutubePlayer
              className="border-2 w-full h-[30rem]"
              videoId={link}
            />
          )}
        </div>
        <div className="w-[40%] border-8 border-black border-solid p-8 mx-16 rounded-2xl h-[500px]">
          <Chat link={link} />
        </div>
      </div>
    </>
  );
};

export default Page;
