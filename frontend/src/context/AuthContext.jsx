import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginUser, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("thief_detect_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("thief_detect_token");
  });

  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(token && user);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const storedToken = localStorage.getItem("thief_detect_token");

        if (!storedToken) {
          setLoading(false);
          return;
        }

        const data = await getCurrentUser();

        if (data.success) {
          setUser(data.user);
          localStorage.setItem("thief_detect_user", JSON.stringify(data.user));
        }
      } catch (error) {
        localStorage.removeItem("thief_detect_token");
        localStorage.removeItem("thief_detect_user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);

    if (data.success) {
      localStorage.setItem("thief_detect_token", data.token);
      localStorage.setItem("thief_detect_user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("thief_detect_token");
    localStorage.removeItem("thief_detect_user");

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated,
      login,
      logout,
    }),
    [user, token, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}