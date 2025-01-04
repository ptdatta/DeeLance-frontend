import { ReactNode, createContext } from "react";

const UserContext = createContext(null);

function UserContextProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={{ user: {} } as any}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
