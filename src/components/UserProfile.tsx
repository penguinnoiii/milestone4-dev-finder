import { UserData } from "../App";

type UserProfileProps = {
  userData: UserData | null;
};

const UserProfile = ({ userData }: UserProfileProps) => {
  return <div>{JSON.stringify(userData)}</div>;
};

export default UserProfile;
