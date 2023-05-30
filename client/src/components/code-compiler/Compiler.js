import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Compiler.module.css";
import { Link, useParams } from "react-router-dom";
//import Spinner from "./Spinner";
import Editor from "@monaco-editor/react";
import NavbarCompiler from "./NavbarCompiler";
import { defineTheme } from "./defineTheme";
import { param } from "jquery";
import { HOME_DATA } from "../../constant";
function Compiler() {
  const [input, setInput] = useState(localStorage.getItem("input"));
  const [user_input, setUserInput] = useState(
    localStorage.getItem("user_input")
  );
  const [language_id, setLanguageId] = useState(
    localStorage.getItem("language_Id")
  );

  const [theme, setTheme] = useState("cobalt");
  const [foundUser, setFoundUser] = useState([]);
  const [selectedQuestion, setselectedQuestion] = useState("");
  const [selectedQuestionNumber, setselectedQuestionNumber] = useState("");

  useEffect(() => {
    axios
      .get(HOME_DATA)

      .then((res) => {
        setFoundUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const params = useParams();
  console.log("mukesh", params.problemId);

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);
  const inputFn = (event) => {
    event.preventDefault();

    setInput(event.target.value);
    localStorage.setItem("input", event.target.value);
  };

  const user_inputFn = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };
  const options = {
    fontSize: fontSize,
  };
  const language_idFn = (event) => {
    event.preventDefault();
    setLanguageId(event.target.value);
    let snippet;
    let language_id = event.target.value;
    switch (language_id) {
      case "71":
        snippet = `print("Hello World")`;
        break;
      case "54":
        snippet = `#include <iostream> \n using namespace std; \n int main() { \n cout << "Hello World" << endl; \n return 0; \n }`;
        break;
      case "50":
        snippet = `#include <stdio.h> \n int main() { \n printf("Hello World"); \n return 0; \n }`;
        break;
      case "62":
        snippet = `import java.io.*;\nimport java.util.*;\n public class Main { \n\t\t public static void main(String[] args) { \n\t\t System.out.println("Hello World"); \n\t } \n }`;
        break;
      case "63":
        snippet = `console.log("Hello World");`;
      default:
        if (language_id === "") {
          snippet = `# Enter your code here`;
        }
        break;
    }
    setInput(snippet);
    localStorage.setItem("input", snippet);
  };
  const submit = async (event) => {
    event.preventDefault();

    console.log(input);
    console.log(user_input);
    console.log(language_id);
    let outputText = document.getElementById(styles["output"]);
    outputText.innerHTML = "";
    outputText.innerHTML += " Compiling ...\n";
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "f6dd720592msh50d5a6bd181739cp1ba9b8jsnb5b250673e70",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          language_id: language_id,
          source_code: input,
          stdin: user_input,
        }),
      }
    );

    outputText.innerHTML += "Submission Created ...\n";

    const jsonResponse = await response.json();

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        //setLoading(false);
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "f6dd720592msh50d5a6bd181739cp1ba9b8jsnb5b250673e70", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);

      outputText.innerHTML = "";

      outputText.innerHTML += `${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  };

  const clearOutput = () => {
    let outputText = document.getElementById(`.${styles.output}`);
    outputText.innerHTML = "";
  };

  return (
    <>
      <div className={styles.app}>
        <NavbarCompiler
          handleThemeChange={handleThemeChange}
          theme={theme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          // valueLang={language_id}
          // handleLangChange={language_idFn}
        />
        <div className={styles.main}>
          <div className={styles["right-container"]}>
            <div className={styles["code-box"]}>
              {foundUser.map((problem) => {
                return (
                  <div>
                    {problem.problemStatement.map((statement) => {
                      //match the problem id with the problem statement and return the problem statement

                      if (statement._id === params.problemId) {
                        return (
                          <div>
                            <label
                              htmlFor="code"
                              style={{
                                border: "1px solid black",
                              }}
                            >
                              <b className="heading p-2 mt-2">
                                Question:{statement.q1}
                              </b>
                              <b className="heading p-2 mt-2">
                                Topic :{statement.topic}
                              </b>
                            </label>
                            <pre
                              className="mt-2"
                              style={{
                                background: "#ccc",
                                padding: "1rem",
                                border: "1px solid black",
                                fontSize: "0.9rem",
                                color: "black",
                              }}
                            >
                              {statement.description}
                            </pre>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles["left-container"]}>
            <div className={styles.tags}>
              <label htmlFor="tags">
                <b className="heading">Language:</b>
              </label>
              <select
                value={language_id}
                onChange={language_idFn}
                id="tags"
                style={{
                  margin: "0 0.5rem",
                }}
              >
                <option value="54">C++</option>
                <option value="50">C</option>
                <option value="62">Java</option>
                <option value="71">Python</option>
                <option value="63">Javascript</option>
              </select>
              <button
                type="submit"
                className={styles["run-btn"]}
                onClick={submit}
                style={{
                  margin: "0 0.5rem",
                }}
              >
                <i className="fas fa-cog fa-fw"></i> Run
              </button>
            </div>

            <Editor
              height="100%"
              required
              name="solution"
              className={styles.editor}
              options={options}
              //provide value to theme
              theme={theme.value}
              onChange={(value) => {
                setInput(value);
              }}
              value={input}
            ></Editor>
          </div>
        </div>
      </div>

      <footer class="bg-light text-center text-lg-start">
        <div class="container p-4">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase">Input</h5>

              <p>
                <textarea
                  id={styles["input"]}
                  onChange={user_inputFn}
                  rows={10}
                  cols={40}
                ></textarea>
              </p>
            </div>

            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase">Output</h5>

              <p>
                <textarea id={styles["output"]} rows={10} cols={40}></textarea>
                <button className="btn btn-primary" onClick={clearOutput}>
                  Clear
                </button>
              </p>
            </div>
          </div>
        </div>

        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <Link
            class="text-dark"
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            TechPlacement
          </Link>
        </div>
      </footer>
    </>
  );
}
export default React.memo(Compiler);
/**
 * 
 *    <div className="right-container">
            <div className="input-box">
              <label>Input:</label>
              <textarea
                id="input"
                onChange={user_inputFn}
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "monospace",
                  padding: "1rem",
                  color: "white",
                }}
              ></textarea>
            </div>

            <div className="output-box">
              <label>Output:</label>
              <textarea id="output"></textarea>
              <button className="clear-btn" onClick={clearOutput}>
                Clear
              </button>
            </div>
          </div>
 */
