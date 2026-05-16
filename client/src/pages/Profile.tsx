import { useMe } from "../hooks/useMe";

const Profile = () => {
  const { data: user } = useMe();
  // Handle the logic when user is not logged in
  return (
    <div>
      Hello, {user.email}! This is your profile page.
    </div>
  )
}

export default Profile;
