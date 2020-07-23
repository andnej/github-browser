import React from "react";
import Fetch from './Fetch';
import { shallow, mount } from 'enzyme';
import GithubUser, { UserDetails } from "./GithubUser";

describe('<GithubUser />', () => {
  xit('renders properly', () => {
    const login = 'fakelogin';
    const GithubUserComponent = mount(<GithubUser login={login} />);
    expect(GithubUserComponent).toMatchSnapshot();
  });
  it('returns <Fetch />', () => {
    const login = 'fakelogin';
    const wrapper = shallow(<GithubUser login={login} />);
    const found = wrapper.find(Fetch);
    expect(found).toHaveLength(1);
    expect(found.props().uri).toEqual(`https://api.github.com/users/${login}`);
    expect(found.props().renderSuccess).toEqual(UserDetails);
  });
});
describe('<UserDetails />', () => {
  it('renders properly', () => {
    const data = { login: 'fakelogin', avatar_url: 'url', location: 'nowhere', name: 'nobody' };
    const UserDetailsComponent = mount(<UserDetails data={data}/>);
    expect(UserDetailsComponent).toMatchSnapshot();
  });
  it('has img node', () => {
    const data = { login: 'fakelogin', avatar_url: 'url', location: 'nowhere', name: 'nobody' };
    const wrapper = shallow(<UserDetails data={data}/>);
    const img = wrapper.find('div.githubUser img');
    expect(img).toHaveLength(1);
    const props = img.get(0).props;
    expect(props.src).toEqual(data.avatar_url);
    expect(props.alt).toEqual(data.login);
    expect(props.style).toEqual({ width: 200});
  });
  it('has div node paralel to img', () => {
    const data = { login: 'fakelogin', avatar_url: 'url', location: 'nowhere', name: 'nobody' };
    const wrapper = shallow(<UserDetails data={data}/>);
    const div = wrapper.find('div.githubUser div');
    expect(div).toHaveLength(1);

    expect(div.contains(<h1>{data.login}</h1>)).toEqual(true);
    expect(div.contains(<p>{data.name}</p>)).toEqual(true);
    expect(div.contains(<p>{data.location}</p>)).toEqual(true);
  });
  it('does not render name and location when it is not available', () => {
    const data = { login: 'fakelogin', avatar_url: 'url' };
    const wrapper = shallow(<UserDetails data={data}/>);
    const div = wrapper.find('div.githubUser div');
    expect(div).toHaveLength(1);

    expect(div.contains(<h1>{data.login}</h1>)).toEqual(true);
    expect(div.contains(<p>{data.name}</p>)).toEqual(false);
    expect(div.contains(<p>{data.location}</p>)).toEqual(false);
  });
});