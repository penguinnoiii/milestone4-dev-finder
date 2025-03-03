import { UserData } from "../App";

type UserProfileProps = {
  userData: UserData | null;
};

const UserProfile = ({ userData }: UserProfileProps) => {
  if (!userData)
   {
    return (
      <main className="grid w-full rounded-md place-items-center  p-5">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">404</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-balance k">Page not found
          </h1>
          <p className="mt-4 text-[0.5rem] font-medium text-pretty text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className=" rounded-md flex flex-col w-full py-5">
      <div className="flex gap-4 items-center">
        <img
          src={userData.profile}
          alt="profile"
          className="rounded-full w-1/4"
        />
        <div>
          <h1 className="text-lg">{userData.username}</h1>
          <p className="text-xs">{userData.date}</p>
        </div>
      </div>
      <div className="flex justify-between gap-1 text-xs bg-gray-600 text-gray-100 p-4 mt-4 rounded-md">
        <p>Public : {userData.public}</p>
        <p>Followers : {userData.followers}</p>
        <p>Following : {userData.following}</p>
      </div>
    </div>
  );
};

export default UserProfile;
