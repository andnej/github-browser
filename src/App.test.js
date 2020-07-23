import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App';
import SearchForm from './components/SearchForm';
import GithubUser from './components/GithubUser';
import UserRepositories from './components/UserRepositories';

describe('<App />', () => {
  it('renders div with className="app"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".app")).toHaveLength(1);
  });
  it('renders SearchForm once', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SearchForm)).toHaveLength(1);
  });
  it('renders GithubUser once', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(GithubUser)).toHaveLength(1);
  });
  it('renders UserRepositories once', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(UserRepositories)).toHaveLength(1);
  });
});