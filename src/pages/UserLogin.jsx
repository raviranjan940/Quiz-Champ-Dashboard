import { useEffect, useState } from "react";
import { appwriteClient } from "../lib/appwrite";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [documents, setDocuments] = useState([]);
    const [verifiedDocuments, setVerifiedDocuments] = useState([]);
    const [unverifiedDocuments, setUnverifiedDocuments] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "UserLogin";
        appwriteClient.currentSession().then((response) => {
            if (response) {
                console.log(response);
                dispatch(login(response));
            }
        });
    }, [dispatch]);

    useEffect(() => {
        appwriteClient.getDocuments().then((response) => {
            setDocuments(response.documents);

            const verifiedDocs = response.documents.filter(
                (document) => document.verified
            );
            setVerifiedDocuments(verifiedDocs);

            const unverifiedDocs = response.documents.filter(
                (document) => !document.verified
            );
            setUnverifiedDocuments(unverifiedDocs);
        });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        appwriteClient
            .login(email, password)
            .then((response) => {
                dispatch(login(response));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <div className="bg-no-repeat bg-cover bg-center relative bg-[url(https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
                <div className="min-h-screen sm:flex sm:flex-row mx-5 justify-center">
                    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl">
                        <div className="self-start hidden lg:flex flex-col  text-white">
                            <img
                                src="quizChampLogo.png"
                                className="h-48 mr-auto object-contain"
                            />
                            <h1 className="mb-3 font-bold text-5xl">
                                Quiz Champ 2024{" "}
                            </h1>
                            <p className="pr-3 text-xl">
                                For Internal Use Only. Unauthorized access is a
                                crime and is punishable by law.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center flex-col gap-2">
                        <div className="p-12 bg-white mx-auto rounded-2xl w-full ">
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center justify-center h-16 w-16 bg-green-400 rounded-lg">
                                        <p className="text-3xl font-semibold">
                                            {documents.length}
                                        </p>
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-lg text-gray-800 font-medium">
                                            Total Records
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Total records in the database
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="text-lg font-medium">
                                    {verifiedDocuments.length}
                                    <span className="text-green-500">
                                        {" "}
                                        Verified Records
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-lg font-medium">
                                    {unverifiedDocuments.length}
                                    <span className="text-red-500">
                                        {" "}
                                        Unverified Records
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                            <div className="mb-4">
                                <h3 className="font-semibold text-2xl text-gray-800">
                                    Sign In{" "}
                                </h3>
                                <p className="text-gray-500">
                                    Please sign in to Quiz Champ Admin
                                    Dashboard.
                                </p>
                            </div>
                            <form
                                onSubmit={handleLogin}
                                className="space-y-5 z-40"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                                        Email
                                    </label>
                                    <input
                                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="email"
                                        placeholder="mail@gmail.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                            </form>
                            <div className="pt-5 text-center text-gray-400 text-xs">
                                <span>
                                    Copyright © 2024{" "}
                                    <a
                                        href="https://www.satyalok.in"
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
