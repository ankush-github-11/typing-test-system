import { useTheme } from '../context/useTheme';
import Navbar from "../components/Navbar";
import { useTitle } from '../hooks/useTitle';
import { Link } from "react-router-dom";

const Edit = () => {
  const { isDark } = useTheme();
  useTitle("Edit Profile");
  return (
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins bg-bgcolor text-textcolor min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl rounded-2xl p-8 shadow-lg bg-bgcolorless">
        <h1 className="mb-8 text-3xl font-bold">
          Edit Profile
        </h1>

        <div className="mb-8 flex flex-col items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Ankush+Bhattacharjee&background=002&color=fff&size=200"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-color1 object-cover"
          />

          <button className="cursor-pointer rounded-lg px-5 py-2 bg-color1 text-white">
            Change Photo
          </button>
        </div>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">
              Bio
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Country
            </label>
            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <Link to="/profile">
              <button
                type="button"
                className="cursor-pointer rounded-lg border border-gray px-6 py-3 font-medium"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-color1 text-white px-6 py-3 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;