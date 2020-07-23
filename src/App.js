import React, {useState} from 'react';
import './App.css';
import GithubUser from './components/GithubUser';
import SearchForm from './components/SearchForm';
import UserRepositories from './components/UserRepositories'

// const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
// const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function App() {
  const [login, setLogin] = useState('moonhighway');
  const [repo, setRepo] = useState('learning-react');

  return (
    <div className="app">
      <SearchForm login={login} setLogin={setLogin} />
      <GithubUser login={login} />
      <UserRepositories login={login} repo={repo} onSelect={setRepo} />
    </div>
  );
}

export default App;
