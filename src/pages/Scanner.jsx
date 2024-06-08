import { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import { appwriteClient } from "../lib/appwrite";

const QRCodeScanner = () => {
    const [qrData, setQrData] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scannerKey, setScannerKey] = useState(Date.now());

    const handleScan = (data) => {
        if (data && data.text) {
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
            {loading ? (
                <div className="flex flex-col items-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-500"></div>
                    <p className="mt-2 text-lg">Loading document...</p>
                </div>
            ) : (
                <>
                    {!qrData ? (
                        <QrScanner
                            key={scannerKey}
                            delay={300}
                            onScan={handleScan}
                            onError={handleError}
                            style={previewStyle}
                            constraints={{
                                audio: false,
                                video: { facingMode: "environment" },
                            }}
                        />
                    ) : (
                        <div className="w-full p-4 rounded-lg text-center">
                            <p className="text-lg">
                                ID:{" "}
                                <span className="font-medium">
                                    {extractedText}
                                </span>
                            </p>
                            <StudentCard data={document} />
                        </div>
                    )}

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() => {
                            setDocument(null);
                            setQrData(null);
                            setExtractedText("");
                            setScannerKey(Date.now());
                        }}
                    >
                        Clear and Retake
                    </button>
                </>
            )}
        </div>
    );
};

export default QRCodeScanner;

function StudentCard({ data }) {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [confirmation, setConfirmation] = useState("");

    useEffect(() => {
        if (data?.photo) {
            appwriteClient
                .getImageById(data.photo)
                .then((response) => {
                    setPhotoUrl(response.href);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [data?.photo]);

    const markPresent = () => {
        appwriteClient
            .markPresent(data?.$id)
            .then((response) => {
                console.log(response);
                setConfirmation("Marked present successfully");
            })
            .catch((error) => {
                console.error(error);
                setConfirmation("Failed to mark present");
            });
    };

    const markAbsent = () => {
        appwriteClient
            .markAbsent(data?.$id)
            .then((response) => {
                console.log(response);
                setConfirmation("Marked absent successfully");
            })
            .catch((error) => {
                console.error(error);
                setConfirmation("Failed to mark absent");
            });
    };

    if (!data) return null; // Render nothing if no data

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl mb-4">Student Card</h1>
            <div className="w-full p-4 rounded-lg text-center">
                {photoUrl && (
                    <img
                        src={photoUrl}
                        alt="Student"
                        className="rounded-full w-32 h-32 object-cover m-auto"
                    />
                )}
                {data.present ? (
                    <p className="text-lg text-green-500">Already marked Present</p>
                ) : data.present === false ? (
                    <p className="text-lg text-red-500">Absent</p>
                ) : (
                    <p className="text-lg">Not Marked</p>
                )}

                <p className="text-lg mt-2 font-medium">Name</p>
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
                    onClick={() => markPresent()}
                >
                    Mark Present
                </button>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={() => markAbsent()}
                >
                    Mark Absent
                </button>
            </div>

            {confirmation && (
                <p className="mt-4 text-lg text-green-500">{confirmation}</p>
            )}
        </div>
    );
}
