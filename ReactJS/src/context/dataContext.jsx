import { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    movies: [],
    actors: [],
  });

  const login = (user) => {
    const storagedUser = JSON.parse(localStorage.getItem("user"));

    if (storagedUser) {
      const isVerified =
        storagedUser.username === user.username &&
        storagedUser.password === user.password;

      if (isVerified) {
        setData({ ...data, user: storagedUser });
        return;
      }
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setData({ ...data, user: null });
  };

  return (
    <DataContext.Provider value={{ data, setData, login, logout }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
