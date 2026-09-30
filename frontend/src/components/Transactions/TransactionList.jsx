import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listCategoriesAPI } from "../../services/category/CategoryServices.js";
import {
  listTransactionsAPI,
  deleteTransactionAPI,
} from "../../services/transactions/TransactionServices.js";
import { useNavigate } from "react-router-dom";

const TransactionList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const { data: categoriesData, isLoading: loadCategories } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => listTransactionsAPI(filters),
    queryKey: ["list-transactions", filters],
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTransaction = (id) => {
    navigate(`/transactions/update/${id}`);
  };

  return (
    <div className="glass-panel glass-surface rounded-3xl p-4 text-white sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="glass-input w-full rounded-2xl px-4 py-3"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="glass-input w-full rounded-2xl px-4 py-3"
        />
        <div className="relative">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="glass-input w-full appearance-none rounded-2xl px-4 py-3 pr-10"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
        </div>
        <div className="relative">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="glass-input w-full appearance-none rounded-2xl px-4 py-3 pr-10"
          >
            <option value="">All Categories</option>
            <option value="uncategorized">Uncategorized</option>
            {loadCategories ? (
              <option value="">Loading categories...</option>
            ) : null}
            {categoriesData?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/6 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-xl font-semibold text-white">Filtered Transactions</h3>
          <p className="text-sm text-white/60">
            {isLoading
              ? "Loading transactions..."
              : `${transactions?.length || 0} results`}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {transactions?.length ? (
            transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/45 p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <span className="block text-sm font-medium text-white/65">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${
                      transaction.type === "income"
                        ? "bg-emerald-400/18 text-emerald-100"
                        : "bg-rose-400/18 text-rose-100"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="ml-2 text-white">
                    {transaction.category?.name} - ${
                      transaction.amount.toLocaleString()
                    }
                  </span>
                  <span className="ml-2 block text-sm italic text-white/65">
                    {transaction.description}
                  </span>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <button
                    onClick={() => handleUpdateTransaction(transaction._id)}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-100 transition hover:bg-cyan-300/18"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="rounded-full border border-rose-300/20 bg-rose-300/10 p-2 text-rose-100 transition hover:bg-rose-300/18"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/6 p-6 text-center text-white/70">
              No transactions found for the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
