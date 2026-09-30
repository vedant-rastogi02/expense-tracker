import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { LoginAPI } from "../../services/users/userServices.js";
import AlertMessage from "../../components/Alert/AlertMessage.jsx";
import { useDispatch } from "react-redux";
import {loginAction} from "../../redux/slice/authSlice.js";
import {useNavigate} from 'react-router-dom';


// validation schema for the login form
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
})

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {mutateAsync,isPending,isSuccess,isError,error} = useMutation({
    mutationFn: LoginAPI,
    mutationKey: ["login"],
  })
 const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
   onSubmit: (values) => {
  mutateAsync(values)
    .then((data) => {
      // dispatch
      dispatch(loginAction(data));
      localStorage.setItem("userInfo", JSON.stringify(data));

    })
    .catch((err) => {
      console.log(err);
    });
}
  })
  useEffect(() => {
  if (isSuccess) {
    navigate("/profile");
  }
}, [isSuccess, navigate]);
  return (
    <form onSubmit={formik.handleSubmit} className="glass-panel glass-surface mx-auto my-12 max-w-md space-y-6 rounded-[28px] border border-white/12 px-6 py-8 text-white sm:px-8">
      <h2 className="text-center text-3xl font-semibold text-white">
        Login
      </h2>
      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Logging in..." />}
      {isError && <AlertMessage type="error" message={error.message} />}
      {isSuccess && <AlertMessage type="success" message="Login successful!" />}

      <p className="text-center text-sm text-white/65">
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3 text-white/45" />
        <input
          id="email"
          type="email"
         
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="glass-input w-full rounded-2xl px-4 py-3 pl-10 pr-4"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-rose-300">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-white/45" />
        <input
          id="password"
          type="password"
           {...formik.getFieldProps("password")}
          placeholder="Password"
          className="glass-input w-full rounded-2xl px-4 py-3 pl-10 pr-4"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-rose-300">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="glass-button w-full rounded-2xl px-4 py-3 font-bold transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
