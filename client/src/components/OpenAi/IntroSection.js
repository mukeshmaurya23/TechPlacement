import React from "react";
import BotResponse from "./BotResponse";
import styles from "./IntroSection.module.css";
const IntroSection = () => {
  return (
    <div className={styles.introsection}>
      <pre
        style={{
          fontSize: "1.8rem",
          color: "#111",
          fontWeight: "bold",
        }}
      >
        Introducing TechPlacement
        <BotResponse response=" - The Ultimate AI Assistant" />
      </pre>
      <p>
        TechPlacement is a virtual assistant that helps you find the right job
        for you. It is powered by OpenAI's GPT-3 API. You can ask it any
        question and it will give you the best answer it can. and you will
        helpful to practise coding questions and get the job.
      </p>
      <pre>
        <b>Features:</b>
        <ul>
          <li>Instant answers to any question</li>

          <li>User-friendly interface</li>
          <li>Available 24 x 7</li>
        </ul>
      </pre>
      <p>
        <b>How to use:</b>
      </p>
      <pre>
        <ul>
          <li>Ask any question</li>
          <li>It will give you the best answer it can</li>
          <li>It will also give you the best job for you</li>
          <li>It will also give you the best coding question for you</li>
        </ul>
      </pre>
    </div>
  );
};

export default IntroSection;
