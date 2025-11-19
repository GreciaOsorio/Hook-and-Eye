import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useTheme } from "/src/context/ThemeContext";

const ThemeSwitcher = () => {
    const {theme, setTheme, themes} = useTheme();

    return (
        <Menu className="!bg-background">
          <MenuHandler variant="text" className="flex flex-row cursor-pointer items-center p-2 text-sm text-text">
            <Button variant="text" className="flex flex-row cursor-pointer items-center  ">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="size-6 mr-1 text-text">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
              Themes
            </Button>
          </MenuHandler>
          <MenuList className="!bg-background">
            <MenuItem
                onClick={() => setTheme(themes.light)}
                className={`mb-2 transition-colors ${
                    theme === themes.light
                        ? 'bg-primary text-white'
                        : 'bg-surface text-primary'
                    }`}
            >
                Light
            </MenuItem>
            <MenuItem
                onClick={() => setTheme(themes.dark)}
                className={` mb-2 transition-colors ${
                    theme === themes.dark
                        ? 'bg-primary text-white'
                        : 'bg-surface text-primary'
                    }`}
            >
                Dark
            </MenuItem>
            <MenuItem
                onClick={() => setTheme(themes.ocean)}
                className={`mb-1 transition-colors ${
                    theme === themes.ocean
                        ? 'bg-primary text-white'
                        : 'bg-surface text-primary'
                    }`}
            >
                Ocean
            </MenuItem>
          </MenuList>
        </Menu>
    )
}

export default ThemeSwitcher;