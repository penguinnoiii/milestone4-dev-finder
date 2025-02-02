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

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleClick = () => {
    const fetchData = async () => {
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
    };
    fetchData();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 w-1/2">
          <h1 className="text-4xl">Dev Finder</h1>
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
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
