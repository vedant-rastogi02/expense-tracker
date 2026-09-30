import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userServices.js";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["change-password"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <>
      <div className="glass-panel glass-surface mx-auto my-10 max-w-4xl rounded-[28px] p-8 text-white">
        <h1 className="mb-2 text-center text-2xl font-extrabold">Welcome</h1>
        <h3 className="mb-4 text-xl font-semibold text-white">Update Profile</h3>
        {isPending && <AlertMessage type="loading" message="Updating...." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Update failed"} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Updated successfully" />
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-white/50" />
            <div className="flex-1">
              <label htmlFor="username" className="text-sm font-medium text-white/75">
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="glass-input mt-1 block w-full rounded-2xl px-4 py-3"
                placeholder="Your username"
              />
            </div>
          </div>
          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-rose-300">{formik.errors.username}</span>
          )}

          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-white/50" />
            <div className="flex-1">
              <label htmlFor="email" className="text-sm font-medium text-white/75">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="glass-input mt-1 block w-full rounded-2xl px-4 py-3"
                placeholder="Your email"
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-rose-300">{formik.errors.email}</span>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="glass-button rounded-2xl px-4 py-3 font-bold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;
