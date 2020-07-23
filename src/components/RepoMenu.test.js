import React, { useEffect } from 'react';
import { useIterator } from '../hooks';
import { RepoMenu } from './RepoMenu';
import { shallow, mount } from 'enzyme';

jest.mock("../hooks");

describe('<RepoMenu />', () => {
  describe('on non empty repositories', () => {
    const name = 'GoogleWeb';
    const repositories = [
      { name: name},
      { name: 'GoogleLens'},
      { name: 'NonGoogle'}
    ];
    const prev = jest.fn();
    const next = jest.fn();
    useIterator.mockReturnValue([{name }, prev, next]);
    const props = {
      repositories,
      repo: name
    }

    it('renders properly', () => {
      const RepoMenuComponent = mount(<RepoMenu {...props} />);
      expect(RepoMenuComponent).toMatchSnapshot();
    });

    it('has proper structure', () => {
      const wrapper = shallow(<RepoMenu {...props} />);
      const div = wrapper.find('div');
      expect(div).toHaveLength(1);
      expect(div.contains(<p>{name}</p>)).toEqual(true);
      expect(div.find("button")).toHaveLength(2);
    });

    it('invokes prev when < clicked', () => {
      const wrapper = shallow(<RepoMenu {...props} />);
      const div = wrapper.find('div');

      const prevButton = div.find('#prevButton');
      expect(prevButton).toHaveLength(1);
      expect(prevButton.text()).toEqual('<');
      prevButton.simulate('click');
      expect(prev).toHaveBeenCalled();
    });

    it('invokes next when > clicked', () => {
      const wrapper = shallow(<RepoMenu {...props} />);
      const div = wrapper.find('div');

      const nextButton = div.find('#nextButton');
      expect(nextButton).toHaveLength(1);
      expect(nextButton.text()).toEqual('>');
      nextButton.simulate('click');
      expect(next).toHaveBeenCalled();
    });
  });
});