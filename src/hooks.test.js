import React, {useState as useStateMock, useEffect as useEffectMock, useCallback as useCallbackMock, useMemo as useMemoMock} from "react";
import { useFetch, fetchData } from './hooks';

jest.mock('react', () => ({
  useState: jest.fn(),
  useEffect: jest.fn(),
  useCallback: jest.fn(),
  useMemo: jest.fn()
}));

describe('useFetch(uri)', () => {
  const setState = jest.fn();
  useStateMock.mockImplementation(init => [init, setState]);
  useEffectMock.mockImplementation(f => f());

  it('set loading to true and do nothing on empty uri', () => {
    const {loading, data, error} = useFetch();
    expect(loading).toEqual(true);
    expect(data).toBeFalsy();
    expect(error).toBeFalsy();
    expect(useEffectMock).toHaveBeenCalled();
  });

  it('calls useEffect on non empty uri', () => {
    useFetch('https://api.google.com/users/moonhighway');
    expect(useEffectMock).toHaveBeenCalled();
  });
});

describe('fetchData', () => {
  const uri = 'an url';
  var setData;
  var setLoading;
  var setError;

  beforeEach(() => {
    fetch.resetMocks();
    setData = jest.fn();
    setLoading = jest.fn();
    setError = jest.fn();
  });

  it('does not fetch on empty uri', () => {
    fetchData();
    expect(fetch).not.toHaveBeenCalled();
    expect(setData).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();
    expect(setError).not.toHaveBeenCalled();
  });

  it('fetch setLoading to false, setData with data on successful fetching', async () => {
    const mockedData = {
      id: 141,
      name: 'moonhighway'
    };
    fetch.mockResponseOnce(JSON.stringify(mockedData));
    await fetchData(uri, setData, setLoading, setError);
    expect(fetch).toHaveBeenCalledWith(uri);
    expect(setData).toHaveBeenCalledWith(mockedData);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it('setError on failure', async () => {
    fetch.mockRejectOnce(() => Promise.reject('error occured'));
    await fetchData(uri, setData, setLoading, setError);
    expect(setData).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalled();
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});