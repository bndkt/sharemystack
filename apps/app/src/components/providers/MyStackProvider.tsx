import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const AppContext = React.createContext<{
  resizeBottomSheet: boolean;
  setResizeBottomSheet: Dispatch<SetStateAction<boolean>>;
}>({
  resizeBottomSheet: false,
  setResizeBottomSheet: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [resizeBottomSheet, setResizeBottomSheet] = useState(false);

  return (
    <AppContext.Provider
      value={{
        resizeBottomSheet,
        setResizeBottomSheet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
