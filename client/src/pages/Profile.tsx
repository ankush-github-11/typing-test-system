import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import { useMe } from "../hooks/useMe";
import { useTitle } from "../hooks/useTitle";

const Profile = () => {
  const { isDark } = useTheme();
  useTitle("Profile");
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the logic when user is not logged in
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="font-poppins h-screen bg-bgcolor text-textcolor"
    >
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Hello, {user.email}! This is your profile page.</div>
      )}
    </div>
  );
};

export default Profile;
