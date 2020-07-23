import React, { useState } from "react";

export default function SearchForm({login, setLogin}) {
  const [val, set] = useState("");
  const saveLogin = () => {
    setLogin(val);
    set("");
  };
  const handleEnter = e => {
    if (e.keyCode === 13) {
      saveLogin();
    }
  }
  return (
    <div className="search_form">
      <label>Search Github User :</label>
      <input value={val} onChange={e=>set(e.target.value)} onKeyUp={handleEnter} placeholder={login}/>
      <button onClick={ saveLogin }>Search</button>
    </div>
  );
}