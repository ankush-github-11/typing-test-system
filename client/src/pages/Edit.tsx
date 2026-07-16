import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";

import {
  editProfileSchema,
  type EditProfileFormData,
} from "../schemas/editProfileSchema";
import { useMe } from "../hooks/useMe";
import { useEditProfile } from "../hooks/useEditProfile";

const Edit = () => {
  const { isDark } = useTheme();

  useTitle("Edit Profile");
  const { data: user } = useMe();
  const { updateProfile } = useEditProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onBlur",
  });
  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name ?? "",
      keyboard: user.keyboard ?? "",
      bio: user.bio ?? "",
      country: user.country ?? "",
      city: user.city ?? "",
      organization: user.organization ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    console.log(data);
    await updateProfile({
      id: user.id,
      ...data,
    });
  };

  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="min-h-screen bg-bgcolor font-poppins text-textcolor"
    >
      <Navbar />

      <div className="mx-auto max-w-5xl p-6 bg-bgcolorless rounded-xl">
        <h1 className="mb-8 text-3xl font-bold">Edit Profile</h1>

        <div className="mb-8 flex flex-col items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Ankush+Bhattacharjee&background=002&color=fff&size=200"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-color1 object-cover"
          />

          <button
            type="button"
            className="cursor-pointer rounded-lg bg-color1 px-5 py-2 text-white"
          >
            Change Photo
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Name</label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Keyboard */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Keyboard</label>

            <input
              {...register("keyboard")}
              type="text"
              placeholder="Keyboard"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />

            {errors.keyboard && (
              <p className="mt-1 text-sm text-red-500">
                {errors.keyboard.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Bio</label>

            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />

            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Country</label>

            <input
              {...register("country")}
              type="text"
              placeholder="Country"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />

            {errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="mb-2 block text-sm font-semibold">City</label>

            <input
              {...register("city")}
              type="text"
              placeholder="City"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />

            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Institution */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">
              Institution / Organization
            </label>

            <input
              {...register("organization")}
              type="text"
              placeholder="Institution / Organization"
              className="w-full rounded-lg border border-gray px-4 py-3 outline-none focus:border-color1"
            />

            {errors.organization && (
              <p className="mt-1 text-sm text-red-500">
                {errors.organization.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4 md:col-span-2">
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
              disabled={isSubmitting}
              className="cursor-pointer rounded-lg bg-color1 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
