import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import SearchForm from "./SearchForm";

describe('<SearchForm />', () => {
  const login = 'fakelogin';
  const setLogin = jest.fn();
  const props = {login, setLogin };

  it('renders properly', () => {
    const SearchFormComponent = mount(<SearchForm {...props} />);
    expect(SearchFormComponent).toMatchSnapshot();
  });
  it('has proper structure', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    expect(wrapper).toHaveLength(1);
    const div = wrapper.find('.search_form');
    expect(div).toHaveLength(1);
    expect(div.hasClass('search_form')).toEqual(true);
    expect(div.contains(<label>Search Github User :</label>)).toEqual(true);
    expect(div.find('input').props().placeholder).toEqual(login);
    expect(div.find('input').props().value).toEqual("");
    expect(div.find('button').text()).toEqual('Search');
  });
  it('calls setLogin on click', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    const input = wrapper.find('input');
    const toType = "horror";
    input.simulate('change', { target: { value: toType }});

    const button = wrapper.find('button');
    button.simulate('click');
    expect(setLogin).toHaveBeenCalledWith(toType);
  });
  it('calls setLogin on enter keyUp', () => {
    const wrapper = shallow(<SearchForm {...props} />);
    const input = wrapper.find('input');
    const toType = "horror";
    input.simulate('change', { target: { value: toType }});
    input.simulate('keyUp', { keyCode: 13 });

    expect(setLogin).toHaveBeenCalledWith(toType);
  });
});