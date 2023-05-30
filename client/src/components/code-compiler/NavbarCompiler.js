import React from "react";
import Select from "react-select";
//import { colors } from "react-select/dist/declarations/src/theme";
import styels from "./NavbarCompiler.module.css";
import monacoThemes from "monaco-themes/themes/themelist";
const NavbarCompiler = ({
  handleThemeChange,
  theme,
  fontSize,
  setFontSize,
  handleLangChange,
  valueLang,
}) => {
  return (
    <div className={styels.navbar}>
      <Select
        // options={themes}
        options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
          label: themeName,
          value: themeId,
          key: themeId,
        }))}
        value={theme}
        // value={userTheme}
        className={styels.select}
        onChange={handleThemeChange}
        placeholder={`Select Theme`}
      />
      <label>Font Size</label>
      <input
        type="range"
        min="18"
        max="40"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      />
      {/* <label>Language</label>
      <Select
        options={[
          { value: "63", label: "JavaScript" },
          { value: "71", label: "Python" },
          { value: "54", label: "C++" },
          { value: "50", label: "C" },
          { value: "62", label: "Java" },
        ]}
        value={valueLang}
        // value={userTheme}
        className={styels.select}
        onChange={handleLangChange}
        placeholder={`Select Language`}
      /> */}
    </div>
  );
};

export default React.memo(NavbarCompiler);
