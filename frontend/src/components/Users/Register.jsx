import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { RegisterAPI } from "../../services/users/userServices.js";
import AlertMessage from "../../components/Alert/AlertMessage.jsx";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';




//Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),

});
const RegistrationForm = () => {
   //Navigate
  const navigate = useNavigate();

   const dispatch = useDispatch();
  const {mutateAsync,isPending,isSuccess,isError,error} = useMutation({
    mutationFn: RegisterAPI,
    mutationKey: ["register"],
  })
 const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validationSchema,
   onSubmit: (values) => {
    console.log(values);
  mutateAsync(values)
    .then((data) => {
      // dispatch
        console.log(data);
      
    })
    .catch((err) => {
      console.log(err);
    });
}

  })
    //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess]);
  return (
    <form onSubmit={formik.handleSubmit} className="glass-panel glass-surface mx-auto my-12 max-w-md space-y-6 rounded-[28px] border border-white/12 px-6 py-8 text-white sm:px-8">
      <h2 className="text-center text-3xl font-semibold text-white">
        Sign Up
      </h2>
      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Registering..." />}
      {isError && <AlertMessage type="error" message={error.message} />}
      {isSuccess && <AlertMessage type="success" message="Registration successful!" />}


      <p className="text-center text-sm text-white/65">
        Join our community now!
      </p>

      {/* Input Field - Username */}
      <div className="relative">
        <FaUser className="absolute left-3 top-3 text-white/45" />
        <input
          id="username"
          type="text"
           {...formik.getFieldProps("username")}
          placeholder="Username"
          className="glass-input w-full rounded-2xl px-4 py-3 pl-10 pr-4"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="text-xs text-rose-300">{formik.errors.username}</span>
        )}
      </div>

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

      {/* Input Field - Confirm Password */}
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-white/45" />
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          placeholder="Confirm Password"
          className="glass-input w-full rounded-2xl px-4 py-3 pl-10 pr-4"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span className="text-xs text-rose-300">
            {formik.errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="glass-button w-full rounded-2xl px-4 py-3 font-bold transition duration-150 ease-in-out"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
