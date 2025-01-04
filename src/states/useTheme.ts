import { create } from "zustand";

const element = document.documentElement;
const initialTheme = localStorage.getItem("theme") ? "dark" : "light";

console.log("initialTheme = ", initialTheme);

const setDarkState = () => {
  element.classList.add("dark");
  localStorage.setItem("theme", "dark");
  element.setAttribute("data-color-scheme", "dark");
};

const setLightState = () => {
  element.classList.remove("dark");
  localStorage.setItem("theme", "light");
  element.setAttribute("data-color-scheme", "light");
};

const useTheme = create<{
  theme: "dark" | "light";
  switchToDarkMode: () => void;
  switchToLightMode: () => void;
  toggleTheme: () => "dark" | "light";
}>((set) => ({
  theme: initialTheme,
  switchToDarkMode: () => {
    set(() => ({ theme: "dark" }));
    setDarkState();
  },
  switchToLightMode: () => {
    set(() => ({ theme: "light" }));
    setLightState();
  },
  toggleTheme: (): any => {
    set((state) => {
      if (state.theme === "light") {
        setLightState();
      }
      if (state.theme === "dark") {
        setDarkState();
      }

      return { theme: state.theme === "light" ? "dark" : "light" };
    });
  },
}));

export default useTheme;
