import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";

const Navigation = ({
  loadNext,
  showFilteredByName,
  showFilteredByType,
  goHome,
}) => {
  const [{ theme, isDarkTheme }, toggleTheme] = useContext(ThemeContext);
  return (
    <nav style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <li>
        <MdOutlineDarkMode
          size={30}
          style={{ cursor: "pointer" }}
          onClick={toggleTheme}
        />

        <AiOutlineHome
          size={30}
          style={{ cursor: "pointer" }}
          onClick={goHome}
        />
      </li>

      <li>
        <button onClick={loadNext}>LOAD MORE</button>
      </li>
      <li>
        <button onClick={showFilteredByType}>FILTER BY TYPE</button>
      </li>
      <li>
        <button onClick={showFilteredByName}>SEARCH BY NAME</button>
      </li>
    </nav>
  );
};

export default Navigation;
