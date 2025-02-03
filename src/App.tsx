import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import UserProfile from "./components/UserProfile";

export type UserData = {
  username: string;
  profile: string;
  date: string;
  public: number;
  followers: number;
  following: number;
};

function App() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleClick = () => {
    const fetchData = async () => {
      try {
        const URL: string = `https://api.github.com/users/${username}`;
        const response = await axios.get(URL);
        const data: UserData = {
          username: response.data.login,
          profile: response.data.avatar_url,
          date: response.data.created_at,
          public: response.data.public_repos,
          followers: response.data.followers,
          following: response.data.following,
        };
        setUserData(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.error("User not found");
          }
        } else {
          console.error("An error occurred");
        }
        setUserData(null);
      }
    };
    fetchData();
  };

  const handleSwitchChange = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (username.length > 0) {
        try {
          const URL: string = `https://api.github.com/users/${username}`;
          const response = await axios.get(URL);
          const data: UserData = {
            username: response.data.login,
            profile: response.data.avatar_url,
            date: response.data.created_at,
            public: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following,
          };
          setUserData(data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              console.error("User not found");
            }
          } else {
            console.error("An error occurred");
          }
          setUserData(null);
        }
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-4xl">Dev Finder</h1>
            <Switch
              checked={darkMode}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="flex gap-1 w-full">
            <input
              type="text"
              placeholder="your username"
              onChange={handleUsernameChange}
              value={username}
              className="w-full border p-2 border-gray-500 rounded-md focus:ring-0 focus:border-transparent"
            />
            <Button
              variant="contained"
              onClick={handleClick}
              className="cursor-pointer p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </Button>
          </div>
          <UserProfile userData={userData} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
