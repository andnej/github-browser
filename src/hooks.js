import {useState, useEffect, useCallback, useMemo} from "react";

export function useFetch(uri, fetchImplementation=fetchData) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await fetchImplementation(uri, setData, setLoading, setError);
  }, [uri]);

  return {
    loading,
    data,
    error
  }
}

export async function fetchData(uri, setData, setLoading, setError) {
  if (!uri) return;
  await fetch(uri)
    .then(data=>data.json())
    .then(setData)
    .catch(setError)
    .finally(()=>setLoading(false))
}

export const useIterator = (items = [], initialIndex = 0) => {
  const [i, setIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i, items.length]);

  const next = useCallback(() => {
    if (i === items.length) return setIndex(0);
    setIndex(i + 1);
  }, [i, items.length]);

  const item = useMemo(() => items[i], [i, items]) 

  return [item || items[0], prev, next];
};