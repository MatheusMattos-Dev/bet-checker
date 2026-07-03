import { useState, useCallback, useRef } from 'react';

export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelledRef = useRef(false);

  const fetch = useCallback(async (fn) => {
    cancelledRef.current = false;
    setLoading(true);
    setError(null);

    try {
      const result = await fn();
      if (!cancelledRef.current) {
        setData(result);
      }
    } catch (err) {
      if (!cancelledRef.current) {
        if (err.message === 'RATE_LIMIT') {
          setError('Limite de requisições excedido. Aguarde e tente novamente.');
        } else {
          setError(err.message);
        }
      }
    }
    if (!cancelledRef.current) {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, fetch, cancel, reset };
}
