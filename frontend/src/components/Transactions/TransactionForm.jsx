 import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import AlertMessage from "../Alert/AlertMessage.jsx";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {addTransactionAPI} from "../../services/transactions/TransactionServices.js";
import { listCategoriesAPI } from "../../services/category/CategoryServices.js";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});


const TransactionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
const { mutateAsync, isPending, isSuccess, isError:isAddErr, error:transErr } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["add-transaction"],
  })



 const {
     data,
     isLoading,
     isError,
     error,
     refetch: refetchCategories,
   } = useQuery({
     queryFn: listCategoriesAPI,
     queryKey: ["list-categories"],
   });
  const formik = useFormik({
      initialValues: {
        type: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      },validationSchema,
      onSubmit: (values) => {
        mutateAsync(values)
          .then((data) => {

           navigate("/dashboard");
          })
          .catch((err) => {
            console.error(err);
          });
      },
    });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="glass-panel glass-surface mx-auto my-8 max-w-2xl space-y-6 rounded-[28px] px-5 py-6 text-white sm:px-6 sm:py-8 lg:px-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Transaction Details
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
        <AlertMessage type="success" message="Transaction added successfully" />
      )}
      {/* Transaction Type Field */}
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
          className="glass-input block w-full rounded-2xl px-4 py-3"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-xs text-rose-300">{formik.errors.type}</p>
        )}
      </div>

      {/* Amount Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="amount" className="font-medium text-white/80">
          <FaDollarSign className="mr-2 inline text-cyan-200" />
          Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Amount"
          className="glass-input w-full rounded-2xl px-4 py-3"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-xs italic text-rose-300">{formik.errors.amount}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="font-medium text-white/80">
          <FaRegCommentDots className="mr-2 inline text-cyan-200" />
          Category
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          className="glass-input w-full rounded-2xl px-4 py-3"
        >
          <option value="">Select a category</option>
          <option value="uncategorized">Uncategorized</option>
          {data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-xs italic text-rose-300">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Date Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="font-medium text-white/80">
          <FaCalendarAlt className="mr-2 inline text-cyan-200" />
          Date
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="glass-input w-full rounded-2xl px-4 py-3"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-xs italic text-rose-300">{formik.errors.date}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="font-medium text-white/80">
          <FaRegCommentDots className="mr-2 inline text-cyan-200" />
          Description (Optional)
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Description"
          rows="3"
          className="glass-input w-full rounded-2xl px-4 py-3"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-xs italic text-rose-300">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="glass-button mt-4 w-full rounded-2xl px-4 py-3 font-bold transition-colors duration-200"
      >
        Submit Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
