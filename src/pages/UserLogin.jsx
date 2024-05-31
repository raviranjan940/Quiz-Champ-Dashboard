import { useState } from "react";


function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div
                className="bg-no-repeat bg-cover bg-center relative bg-[url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)]"
            >
                <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
                <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                        <div className="self-start hidden lg:flex flex-col  text-white">
                            <img src="quizChampLogo.png" className="h-48 mr-auto object-contain" />
                            <h1 className="mb-3 font-bold text-5xl">
                                Quiz Champ 2024 {" "}
                            </h1>
                            <p className="pr-3">
                                Quiz Champ is a platform for conducting online quizzes. It is aplatform where you can create quizzes and share them with your friends. You can also participate in quizzes created by others
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center  z-10">
                        <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                            <div className="mb-4">
                                <h3 className="font-semibold text-2xl text-gray-800">
                                    Sign In{" "}
                                </h3>
                                <p className="text-gray-500">
                                    Please sign in to Quiz Champ Admin Dashboard.
                                </p>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                                        Email
                                    </label>
                                    <input
                                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="email"
                                        placeholder="mail@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}  
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                        Password
                                    </label>
                                    <input
                                        className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                            <div className="pt-5 text-center text-gray-400 text-xs">
                                <span>
                                    Copyright © 2024 {" "}
                                    <a
                                        href="https://codepen.io/uidesignhub"
                                        rel=""
                                        target="_blank"
                                        title="Ajimon"
                                        className="text-green hover:text-green-500 "
                                    >
                                        Satyalok
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
