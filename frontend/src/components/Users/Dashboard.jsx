import React from "react";
import TransactionList from "../Transactions/TransactionList";
import TransactionChart from "../Transactions/TransactionChart";


const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        <TransactionChart />
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;
