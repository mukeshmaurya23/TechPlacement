import React, { useEffect } from "react";
import styles from "./ChatBot.module.css";
import boticon from "../images/boticon.svg";
import { Link } from "react-router-dom";
const ChatBot = () => {
  // useEffect(() => {
  //   (function (d, m) {
  //     var kommunicateSettings = {
  //       appId: "5acbfa7ffb3039de5249f9b207f5d5f1",
  //       popupWidget: true,
  //       automaticChatOpenOnNavigation: true,
  //     };
  //     var s = document.createElement("script");
  //     s.type = "text/javascript";
  //     s.async = true;
  //     s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
  //     var h = document.getElementsByTagName("head")[0];
  //     h.appendChild(s);
  //     window.kommunicate = m;
  //     m._globals = kommunicateSettings;
  //   })(document, window.kommunicate || {});
  // }, []);
  // steps
  /*
  
  https://cloud.google.com/dialogflow/es/docs
  train the bot
  //create a intents and entities
  //and define the responses and training phrases
  //and then create a agent

  //dialogflow
  //then open the kcommuniate and add the agent
  //dialogflow agent and copy code and paste it in the kommunicate
  
  Project ID
techplacement-nxuy  click on this and go to google developer console and add the service account key
  */

  return (
    <div className={styles.chatbotlogo}>
      <Link to="/TechPlacement-Ultimate-AI" className={styles.chatbotbutton}>
        <img src={boticon} alt="chatbot" />
      </Link>
    </div>
  );
};

export default ChatBot;
