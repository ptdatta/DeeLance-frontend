import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "states/useTheme";

function ThemeSwitch({ className }: any) {
  const { theme, switchToDarkMode, switchToLightMode } = useTheme(
    (state) => state
  );
  const isDark = theme === "dark";

  return (
    <button
      className={className}
      onClick={() => {
        if (isDark) {
          switchToLightMode();
        } else {
          switchToDarkMode();
        }
      }}
    >
      {!isDark ? <FaMoon className="text-[.9em]" /> : <FaSun />}
    </button>
  );
}

export default ThemeSwitch;
