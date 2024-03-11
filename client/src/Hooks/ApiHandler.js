import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/GlobalStates/Authstate";

export default function ApiHandler() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpSet, setIsOpSet] = useState(false);
  const [reqOp, setReqOp] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.accessToken) callAPI();
  }, [authState.accessToken]);

  useEffect(() => {
    if (reqOp.length) setIsOpSet(true);
  }, [reqOp]);

  useEffect(() => {
    if (isOpSet) callAPI();
  }, [isOpSet]);

  const setOp = (url, newMethod = "GET", newBody = null, newOptions = {}) => {
    setIsOpSet(false);
    setReqOp([
      url,
      {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
          "Content-Type": "application/json",
        },
        ...newOptions,
        method:newMethod,
        body: newBody ? JSON.stringify(newBody) : null,
      },
    ]);
  };

  const reAuth = async () => {
    try {
      await fetch(`/api/auth/token`, {
        method: "POST",
        body: JSON.stringify({
          id: authState.id,
          refreshToken: authState.refreshToken,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200)
            setAuthState({
              ...authState,
              accessToken: res.accessToken,
              refresh: res.refreshToken,
            });
          else throw new Error("Unauthorized to access page");
        });
    } catch (err) {
      return err.message;
    }
  };

  const callAPI = async () => {
    if (isOpSet) {
      setLoading(true);
      try {
        await fetch(...reqOp)
          .then((res) => {
            if (res.status === 403) reAuth();
            else if (res.status !== 401) return res.json();
          })
          .then((res) => {
            setData(res);
          });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return { data, loading, error, setOp, isOpSet, callAPI };
}
