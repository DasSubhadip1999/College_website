import { createContext, useState } from "react";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const [colors] = useState({
    primary: "#ff725e",
    secondary: "#fff",
  });

  return (
    <ResponsiveContext.Provider value={{ colors }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveContext;
