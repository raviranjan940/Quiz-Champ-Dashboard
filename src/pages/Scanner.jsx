import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import { appwriteClient } from "../lib/appwrite";

const QRCodeScanner = () => {
    const [qrData, setQrData] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scannerKey, setScannerKey] = useState(Date.now()); // Key to force re-render

    const handleScan = (data) => {
        if (data) {
            console.log(data);
            setQrData(data);
            // Extract the text between square brackets
            const match = data.text.match(/\[(.*?)\]/);
            if (match) {
                console.log(match[1]);
                setExtractedText(match[1]);
            } else {
                setExtractedText("No text found in brackets");
            }
        }
    };

    useEffect(() => {
        if (extractedText) {
            setLoading(true);
            appwriteClient
                .getDocument(extractedText)
                .then((response) => {
                    console.log(response);
                    setDocument(response);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [extractedText]);

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 200,
        width: 240,
    };

    return (
        <div className="flex flex-col items-center">
            {qrData ? (
                <div className="w-full p-4 rounded-lg text-center">
                    Please verify the extracted text before proceeding
                </div>
            ) : (
                <QrScanner
                    key={scannerKey} // Use key prop to force re-render
                    delay={300}
                    onScan={handleScan}
                    onError={handleError}
                    style={previewStyle}
                    constraints={{
                        audio: false,
                        video: { facingMode: "environment" },
                    }}
                />
            )}

            <p className="mt-4 text-lg">
                ID: <span className="font-medium">{extractedText}</span>
            </p>

            {loading ? (
                <div className="flex flex-col items-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-500"></div>
                    <p className="mt-2 text-lg">Loading document...</p>
                </div>
            ) : (
                <StudentCard data={document} />
            )}

            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                    setDocument(null);
                    setQrData(null);
                    setExtractedText("");
                    setScannerKey(Date.now()); // Update key to reset scanner
                }}
            >
                Clear and Retake
            </button>
        </div>
    );
};

export default QRCodeScanner;

function StudentCard({ data }) {
    const [photoUrl, setPhotoUrl] = useState(null);
    useEffect(() => {
        data.photo &&
            appwriteClient
                .getImageById(data.photo)
                .then((response) => {
                    setPhotoUrl(response.href);
                })
                .catch((error) => {
                    console.error(error);
                });
    }, [data.photo]);

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl mb-4">Student Card</h1>
            <div className="w-full p-4 rounded-lg text-center">
                <img
                    src={photoUrl}
                    alt="Student"
                    className="rounded-full w-32 h-32 object-cover m-auto"
                />
                <p className="text-lg mt-4 font-medium">Name</p>
                <p className="text-lg">{data.name}</p>
                <p className="text-lg mt-2 font-medium">
                    Medium of Examination
                </p>
                <p className="text-lg">{data.mediumOfStudy}</p>
                <p className="text-lg mt-2 font-medium">Mobile Number</p>
                <p className="text-lg">{data.mobile}</p>
                <p className="text-lg mt-2 font-medium">Verified</p>
                <p className="text-lg">{data.verified ? "Yes" : "No"}</p>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        appwriteClient
                            .markPresent(data.$id)
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                >
                    Mark Present
                </button>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={() => {
                        appwriteClient
                            .markAbsent(data.$id)
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                >
                    Mark Absent
                </button>
            </div>
        </div>
    );
}
