import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutAction } from "../../redux/slice/authSlice.js";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="glass-panel-strong sticky top-4 z-50 mx-4 rounded-[28px]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-4">
                <div className="-ml-2 mr-2 flex items-left md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2 text-white/80 transition hover:bg-white/18 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/60">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
               <div className="flex flex-shrink-0 items-center">
                  <span className="text-2xl font-bold text-cyan-200 drop-shadow-[0_0_18px_rgba(121,231,255,0.45)]">💰</span>
                </div>
                <div className="hidden md:ml-3 md:flex md:space-x-3">
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white/90 transition hover:bg-white/16 hover:text-white"
                  >
                    ExpenseOne
                  </Link>
                </div>
                <div className="hidden md:ml-2 md:flex md:space-x-3">
                  <Link
                    to="/add-transaction"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/14 hover:text-white"
                  >
                    Add Transaction
                  </Link>
                  <Link
                    to="/add-category"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/14 hover:text-white"
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/categories"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/14 hover:text-white"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/14 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/14 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                     onClick={logoutHandler}
                    type="button"
                    className="glass-button-ghost relative m-2 inline-flex items-center gap-x-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:scale-[1.01]"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="relative flex rounded-full border border-white/15 bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/60">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-2xl border border-white/12 bg-slate-950/85 py-2 shadow-2xl backdrop-blur-2xl focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/student-dashboard"
                              className={classNames(
                                active ? "bg-white/12 text-white" : "text-white/75",
                                "block px-4 py-2 text-sm transition"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                               onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-white/12 text-white" : "text-white/75",
                                "block w-full px-4 py-2 text-left text-sm transition"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
          <Disclosure.Panel className="md:hidden border-t border-white/10">
            <div className="space-y-2 px-4 pb-4 pt-4">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  ExpenseOne
                </Disclosure.Button>
              </Link>
              <Link to="/add-transaction">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Add Transaction
                </Disclosure.Button>
              </Link>
              <Link to="/add-category">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Add Category
                </Disclosure.Button>
              </Link>
              <Link to="/categories">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Categories
                </Disclosure.Button>
              </Link>
              <Link to="/profile">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Profile
                </Disclosure.Button>
              </Link>
              <Link to="/dashboard">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  My Dashboard
                </Disclosure.Button>
              </Link>
            </div>
            {/* Profile links */}
            <div className="border-t border-white/10 px-4 pb-4 pt-4">
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="button"
                  // onClick={logoutHandler}
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
