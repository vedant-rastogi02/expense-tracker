import React from "react";
import {
  FaMoneyBillWave,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <div className="relative overflow-hidden px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel-strong glass-surface rounded-[32px] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <h1 className="text-glow max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Track Your Expenses Effortlessly
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-xl">
                Manage your finances with a modern solution designed for you.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <div className="glass-panel flex flex-col items-center rounded-3xl px-5 py-4 text-white/85">
                  <FaMoneyBillWave className="text-3xl text-cyan-200" />
                  <p className="mt-2 text-sm font-medium">Efficient Tracking</p>
                </div>
                <div className="glass-panel flex flex-col items-center rounded-3xl px-5 py-4 text-white/85">
                  <FaFilter className="text-3xl text-fuchsia-200" />
                  <p className="mt-2 text-sm font-medium">Transactions Filtering</p>
                </div>
                <div className="glass-panel flex flex-col items-center rounded-3xl px-5 py-4 text-white/85">
                  <IoIosStats className="text-3xl text-emerald-200" />
                  <p className="mt-2 text-sm font-medium">Insightful Reports</p>
                </div>
              </div>

              <Link to="/register" className="mt-10 inline-flex">
                <button className="glass-button rounded-full px-7 py-3.5 font-semibold transition duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">
            How It Works
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="glass-panel rounded-[28px] p-6 text-center text-white/80">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/18 text-cyan-100">
                <FaSignInAlt className="text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Sign Up</h3>
              <p>Register and start managing your expenses in a minute.</p>
            </div>
            <div className="glass-panel rounded-[28px] p-6 text-center text-white/80">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-300/18 text-emerald-100">
                <FaList className="text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Add Transactions</h3>
              <p>Quickly add income and expenses to your account.</p>
            </div>
            <div className="glass-panel rounded-[28px] p-6 text-center text-white/80">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-300/18 text-fuchsia-100">
                <FaChartPie className="text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">View Reports</h3>
              <p>See insightful reports & graphs of your finances.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">
            What Our Users Say
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-[28px] p-6 text-white/80">
              <FaQuoteLeft className="text-xl text-cyan-100/80" />
              <p className="mt-4 leading-7">
                "This app has revolutionized the way I track my expenses. Highly
                intuitive and user-friendly."
              </p>
              <p className="mt-4 font-semibold text-white">- Jane Doe</p>
            </div>
            <div className="glass-panel rounded-[28px] p-6 text-white/80">
              <FaQuoteLeft className="text-xl text-fuchsia-100/80" />
              <p className="mt-4 leading-7">
                "Finally, a hassle-free way to manage my finances. The insights
                feature is a game changer!"
              </p>
              <p className="mt-4 font-semibold text-white">- John Smith</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-14 pt-2 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel-strong glass-surface mx-auto max-w-4xl rounded-[32px] px-6 py-12 text-center sm:px-10">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="mt-4 text-white/75">
              Join us now and start managing your expenses like a pro!
            </p>
            <Link to="/register" className="mt-8 inline-flex">
              <button className="glass-button rounded-full px-7 py-3.5 font-semibold transition duration-300">
                Sign Up For Free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
