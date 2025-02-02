import axios from "axios";
import { ChangeEvent, useState } from "react";
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

  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  console.log(username);

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
        setError(null);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError("User not found");
          }
        } else {
          setError("An error occurred");
        }
        setUserData(null);
      }
    };
    fetchData();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-4xl">Dev Finder</h1>
            <button className="w-1/5 cursor-pointer p-2 bg-gray-500 text-gray-50 rounded-md text-[7px] hover:bg-gray-700 ">dark mode</button>
          </div>
          <div className="flex gap-1 w-full">
            <input
              type="text"
              placeholder="your username"
              onChange={handleUsernameChange}
              value={username}
              className="w-full border p-2 border-gray-500 rounded-md focus:ring-0 focus:border-transparent"
            />
            <button
              onClick={handleClick}
              className="cursor-pointer p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <UserProfile userData={userData} />
        </div>
      </div>
    </>
  );
}

export default App;
