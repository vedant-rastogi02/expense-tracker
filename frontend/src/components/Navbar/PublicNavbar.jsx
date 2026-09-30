import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="glass-panel-strong sticky top-4 z-50 mx-4 rounded-[28px]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
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
                  {/* Logo */}
                 
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-white/90 transition hover:bg-white/16 hover:text-white"
                  >
                    ExpenseOne
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to="/register"
                    className="glass-button-ghost relative inline-flex items-center gap-x-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:scale-[1.01]"
                  >
                    <FaRegUser className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="glass-button relative ml-2 inline-flex items-center gap-x-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:scale-[1.01]"
                  >
                    <RiLoginCircleLine
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Login
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full border border-white/15 bg-white/10 p-2 text-white/75 transition hover:bg-white/18 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                  >
                    <span className="absolute -inset-1.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

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

              <Link to="/register">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button
                  as="button"
                  className="block w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-4 pr-4 text-left text-base font-medium text-white/80 transition hover:bg-white/12 hover:text-white"
                >
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
