import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "../../services/users/userServices.js";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });

  const formik = useFormik({
    initialValues: {
      password: "123456",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values.password)
        .then(() => {
          dispatch(logoutAction());
          localStorage.removeItem("userInfo");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="glass-panel glass-surface mx-auto mb-12 mt-8 max-w-xl rounded-[28px] p-8 text-white">
      <h2 className="mb-4 text-center text-2xl font-semibold">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {isPending && <AlertMessage type="loading" message="Updating...." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Update failed"} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Password updated successfully" />
        )}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="new-password">
            New Password
          </label>
          <div className="glass-input flex items-center rounded-2xl px-4 py-3">
            <AiOutlineLock className="mr-2 text-white/45" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="mt-2 block text-xs text-rose-300">{formik.errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="glass-button w-full rounded-2xl px-4 py-3 font-bold"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
