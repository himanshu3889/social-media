import { GoogleLogin, googleLogout } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import AppLogo from "../public/app-logo.png"

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const { userProfile,addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState<string | "">("");
  const router = useRouter();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
      setSearchValue("")
    }
  };

  return (
    <nav className="bg-[#3d7fc0] p-1 h-12">
      <div className="flex justify-between items-center">
        {/* <!-- LEFT --> */}
        <div className="flex items-center space-x-2">
          {/* <!-- logo --> */}
          <Link href="/">
            <div className="w-[40px] h-[15px] md:w-[80px] md:h-[30px]">
              <Image
                className="cursor-pointer rounded-sm"
                src={AppLogo}
                alt="logo"
                layout="responsive"
              />
            </div>
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex justify-center bg-white rounded-xl border-2 border-gray-600 overflow-hidden"
          >
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="w-16 sm:w-24 md:w-full  block rounded-md border-0 focus:outline-none flex-grow sm:py-1 px-2"
            />
            <button type="submit" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass text-xl text-blue-400 hover:text-blue-600 mr-2"></i>
            </button>
          </form>
        </div>
        {/* <!-- MIDDLE --> */}
        <div className="relative flex justify-around w-1/5 items-center">
          <div className="relative group">
            <Link href="/">
              <div className="hover:bg-gray-600 p-1 hover:rounded-lg transition-all ease-in-out duration-300 cursor-pointer">
                <i className="fa-solid fa-house text-xs sm:text-2xl text-white"></i>
              </div>
            </Link>
            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
          </div>
          <div className="relative group">
            <Link href="/post/videos">
              <div className="group-hover:bg-gray-600 p-1 group-hover:rounded-lg transition-all ease-in-out duration-300 cursor-pointer">
                <i className="fa-solid fa-clapperboard text-xs sm:text-2xl text-white"></i>
              </div>
            </Link>
            <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out "></div>
          </div>
          {user && (
            <div className="relative group">
              <Link href="/upload">
                <div className="group-hover:bg-gray-600 p-1 group-hover:rounded-lg transition-all ease-in-out duration-300 cursor-pointer">
                  <i className="fa-solid fa-square-plus text-xs sm:text-2xl text-white"></i>
                </div>
              </Link>
              <div className="absolute group-hover:border-b-2 group-hover:cursor-pointer mt-2 border-blue-500 w-full transition-all duration-100 ease-in-out"></div>
            </div>
          )}
        </div>
        {/* <!-- RIGHT --> */}
        <div className="flex justify-evenly w-1/5">
          {user ? (
            <div className="flex gap-1 sm:gap-5 md:gap-10">
              {user.image && (
                <Link href={`/profile/${user._id}`}>
                  <div className="shrink-0 cursor-pointer">
                    <img
                      className="object-cover w-8 h-8 md:w-10 md:h-10 border-2 border-gray-400 rounded-full"
                      src={user.image}
                      alt="user"
                    />
                  </div>
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <i className="fa-solid fa-right-from-bracket text-xs sm:text-2xl p-1 text-red-500 bg-white rounded-full cursor-pointer outline-none shadow-md"></i>
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Login Failed")}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
