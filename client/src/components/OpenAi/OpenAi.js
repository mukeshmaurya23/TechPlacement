import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Loading from "./Loading";
import NewChat from "./NewChat";
import Error from "./Error";
import NavLinks from "./NavLink";
import styles from "./OpenAi.module.css";
import BotResponse from "./BotResponse";
import NavPrompt from "./NavPrompt";
import IntroSection from "./IntroSection";
import { OPEN_AI } from "../../constant";
const OpenAi = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPrompt === "") return;
    setChatLog([...chatLog, { chatPrompt: inputPrompt }]);
    setInputPrompt("");
    async function getResponse() {
      try {
        const res = await fetch(OPEN_AI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: inputPrompt }),
        });
        const data = await res.json();
        setChatLog([
          ...chatLog,
          {
            chatPrompt: inputPrompt,
            botMessage: data.botResponse,
          },
        ]);
        setErr(false);
      } catch (err) {
        setErr(err);
      }
    }
    getResponse();
    setInputPrompt("");
  };

  return (
    <>
      <div
        className={styles.openAi}
        style={{
          marginTop: "5rem",
        }}
      >
        <header className={styles.header}>
          <div className={styles.menu}>
            <button onClick={() => setShowMenu(true)}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#d9d9e3"
                strokeLinecap="round"
              >
                <path d="M21 18H3M21 12H3M21 6H3" />
              </svg>
            </button>
          </div>
          <h1>TechPlacement</h1>
        </header>

        {showMenu && (
          <nav className={styles.nav}>
            <div className={styles.navItems}>
              <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
              {chatLog.map(
                (chat, idx) =>
                  chat.botMessage && (
                    <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
                  )
              )}
            </div>
            <div className={styles.navCloseIcon}>
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                xmlSpace="preserve"
                stroke="#fff"
                width={42}
                height={42}
                onClick={() => setShowMenu(false)}
              >
                <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
              </svg>
            </div>
          </nav>
        )}

        <aside className={styles.sideMenu}>
          <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
          <div className={styles.navPromptWrapper}>
            {chatLog.map(
              (chat, idx) =>
                chat.botMessage && (
                  <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
                )
            )}
          </div>
          {chatLog.length > 0 && (
            <NavLinks
              svg={
                <svg
                  fill="#111"
                  viewBox="0 0 24 24"
                  data-name="Flat Line"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon flat-line"
                  stroke="#111"
                  width={23}
                  height={23}
                >
                  <path
                    d="M5 8h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5V8Z"
                    transform="rotate(90 12 14)"
                    style={{
                      fill: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <path
                    d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
                    style={{
                      fill: "none",
                      stroke: "#111",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                  />
                  <path
                    data-name="primary"
                    d="M10 11v6m4-6v6M4 7h16m-2 13V7H6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z"
                    style={{
                      fill: "none",
                      stroke: "#111",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                    }}
                  />
                </svg>
              }
              text="Clear Conversations"
              setChatLog={setChatLog}
            />
          )}
        </aside>
        <section className={styles.chatBox}>
          {chatLog.length > 0 ? (
            <div className={styles.chatLogWrapper}>
              {chatLog.length > 0 &&
                chatLog.map((chat, idx) => (
                  <div className={styles.chatLog} key={idx}>
                    <div className={styles.chatPromptMainContainer}>
                      <div className={styles.chatPromptWrapper}>
                        <Avatar bg="#5437DB" className={styles.userSVG}>
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={1.9}
                            viewBox="0 0 24 24"
                            // strokeLinecap="round"
                            // strokeLinejoin="round"
                            className="h-6 w-6"
                            height={40}
                            width={40}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                          </svg>
                        </Avatar>
                        <div id="chatPrompt">{chat.chatPrompt}</div>
                      </div>
                    </div>

                    <div className={styles.botMessageMainContainer}>
                      <div className={styles.botMessageWrapper}>
                        <Avatar bg="#11a27f" className={styles.openaiSVG}>
                          <svg
                            width={41}
                            height={41}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth={1.5}
                            className="h-6 w-6"
                          >
                            <path
                              d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Avatar>
                        {chat.botMessage ? (
                          <div className={styles.botMessage}>
                            <BotResponse response={chat.botMessage} />
                          </div>
                        ) : err ? (
                          <Error err={err} />
                        ) : (
                          <Loading />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <IntroSection />
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputPromptWrapper}>
              <input
                name="inputPrompt"
                id=""
                className={styles.inputPrompttTextarea}
                type="text"
                rows="1"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                autoFocus
              ></input>
              <p></p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default OpenAi;
