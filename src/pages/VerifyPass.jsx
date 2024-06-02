import { useEffect, useState } from "react";
import Card from "./Card";
import { appwriteClient } from "../lib/appwrite";

function VerifyPass() {
    const [documents, setDocuments] = useState([]);
    const [verifiedDocuments, setVerifiedDocuments] = useState([]);
    const [unverifiedDocuments, setUnverifiedDocuments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        document.title = "VerifyPass";
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

    useEffect(() => {
        console.log("documents", documents);
    }, [documents]);

    return (
        <div className="overflow-x-hidden w-full max-w-7xl m-auto">
            <div>
                {/* verified unverified counts card */}
                <div className="flex justify-center">
                    <div className="p-5 m-5 bg-green-200 rounded-lg w-1/2">
                        <h1 className="text-3xl text-center font-semibold">
                            {verifiedDocuments.length}
                        </h1>
                        <p className="text-center">Verified</p>
                    </div>
                    <div className="p-5 m-5 bg-red-200 rounded-lg w-1/2">
                        <h1 className="text-3xl text-center font-semibold">
                            {unverifiedDocuments.length}
                        </h1>
                        <p className="text-center">Unverified</p>
                    </div>
                </div>
            </div>

            {/* sliding card section  */}
            <div className="flex flex-col items-center space-x-4 mb-10 gap-4">
                {unverifiedDocuments[currentIndex] && (
                    <Card
                        key={unverifiedDocuments[currentIndex].$id}
                        {...unverifiedDocuments[currentIndex]}
                    />
                )}
                <div className="flex gap-3">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg rounded-s-full"
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex - 1 + documents.length) %
                                    documents.length
                            )
                        }
                    >
                        Previous
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg rounded-e-full"
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex + 1) % documents.length
                            )
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyPass;
