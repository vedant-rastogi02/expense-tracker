import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {addCategoryAPI} from '../../services/category/categoryServices.js';
import AlertMessage from "../Alert/AlertMessage.jsx";


const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required"),
    
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["addCategory"],
  })
  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          navigate("/categories");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="glass-panel glass-surface mx-auto my-10 max-w-lg space-y-6 rounded-[28px] px-5 py-6 text-white sm:px-6 sm:py-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Add New Category
        </h2>
        <p className="text-white/65">Fill in the details below.</p>
      </div>
      {/* Display alert message */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened please try again later"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category added successfully, redirecting..."
        />
      )}
      {/* Category Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex items-center gap-2 font-medium text-white/80"
        >
          <FaWallet className="text-cyan-200" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="glass-input mt-1 w-full rounded-2xl px-4 py-3"
        >
          <option value="">Select category type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-xs text-rose-300">{formik.errors.type}</p>
        )}
      </div>

      {/* Category Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium text-white/80">
          <SiDatabricks className="mr-2 inline text-cyan-200" />
          Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="Name"
          id="name"
          className="glass-input mt-1 w-full rounded-2xl px-4 py-3"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-xs italic text-rose-300">{formik.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="glass-button mt-4 rounded-2xl px-4 py-3 font-bold transition-colors duration-200 transform"
      >
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
