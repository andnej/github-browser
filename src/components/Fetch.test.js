import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { useFetch } from "../hooks";
import Fetch from './Fetch';

jest.mock("../hooks");

describe('<Fetch />', () => {
  it('renders loading when loading is true', () => {
    useFetch.mockReturnValue({
      loading: true,
      data: {},
      error: null
    });
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const loadingNode = <p>loading..</p>
    const wrapper = shallow(<Fetch uri="any url" renderSuccess={successCallback} loadingFallback={loadingNode} renderError={errorCallback} />);
    expect(wrapper.contains(loadingNode)).toEqual(true);
    expect(errorCallback).not.toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
  });
  it('calls errorError when error is true', () => {
    const error = { message: "an error has occured"};

    useFetch.mockReturnValue({
      loading: false,
      data: {},
      error
    });

    const errorCallback = jest.fn();
    const loadingNode = <p>loading..</p>
    const successCallback = jest.fn();
    const wrapper = shallow(<Fetch uri="any url" renderSuccess={successCallback} loadingFallback={loadingNode} renderError={errorCallback} />);
    expect(wrapper.contains(loadingNode)).toEqual(false);
    expect(errorCallback).toHaveBeenCalledWith(error);
    expect(successCallback).not.toHaveBeenCalled();
  });
  it('calls renderSuccess when data exists', () => {
    const data = { id: 'moonstone' };

    useFetch.mockReturnValue({
      loading: false,
      data,
      error: null
    });

    const errorCallback = jest.fn();
    const loadingNode = <p>loading..</p>
    const successCallback = jest.fn();
    const wrapper = shallow(<Fetch uri="any url" renderSuccess={successCallback} loadingFallback={loadingNode} renderError={errorCallback} />);
    expect(wrapper.contains(loadingNode)).toEqual(false);
    expect(errorCallback).not.toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalledWith({data});
  });
});