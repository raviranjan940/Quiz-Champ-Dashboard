import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { appwriteClient } from "../lib/appwrite";

const Card = ({
    $createdAt,
    $id,
    aadhar,
    aadharFront,
    email,
    fathersName,
    mediumOfStudy,
    mobile,
    mothersName,
    name,
    paymentSlip,
    photo,
    schoolID,
    schoolName,
    verified,
}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [paySlipUrl, setPaySlipUrl] = useState("");
    const [aadharUrl, setAadharUrl] = useState("");
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        appwriteClient.getImageById(photo).then((response) => {
            console.log("response", response);
            setImageUrl(response.href);
        });

        appwriteClient.getImageById(paymentSlip).then((response) => {
            console.log("response", response);
            setPaySlipUrl(response.href);
        });

        appwriteClient.getImageById(aadharFront).then((response) => {
            console.log("response", response);
            setAadharUrl(response.href);
        });
    }, []);

    const markAsVerified = async (e) => {
        e.preventDefault();
        try {
            await appwriteClient.markVerified($id);
            setOpenPopup(true);
        } catch (error) {
            alert("Error in Verifying Document");
        }
    };

    const handlePopupClose = (e) => {
        e.preventDefault();
        setOpenPopup(false);
    };

    return (
        <form onSubmit={markAsVerified} className="max-w-5xl p-6 border">
            <div className="flex gap-6 p-2 items-center">
                <img
                    src={imageUrl}
                    className="rounded-full h-20 w-20 md:w-28 md:h-28 object-cover mb-5 border-4 border-orange-500 "
                />
                <div className="p-4 self-center">
                    <div>
                        <label className="font-medium">Name: </label>
                        <span>{name}</span>
                    </div>

                    <div>
                        <label className="font-medium">Mobile: </label>
                        <span>{mobile}</span>
                    </div>
                    {verified ? (
                        <span className="bg-green-400 text-white px-2 py-0.5 rounded-md">
                            Already Verified
                        </span>
                    ) : (
                        <span className="bg-red-400 text-white px-2 py-0.5 rounded-md">
                            Unverified
                        </span>
                    )}
                </div>
            </div>
            <div className="text-center m-auto bg-green-700 text-white w-fit px-4 py-1 rounded-md">
                <label className="font-medium">Pass Id: </label>
                <span>{$id}</span>
            </div>
            <div className="mt-3 grid md:grid-cols-2 gap-6 font-semibold mb-6">
                <div className="w-fit mx-auto bg-slate-100 p-2 rounded-lg">
                    <p className="text-center mb-2">Payment Slip</p>
                    <img
                        className="object-contain rounded max-h-[700px] mx-auto mb-4"
                        src={paySlipUrl}
                    />

                    <div>
                        <input type="checkbox" required className="mt-2" />{" "}
                        <label className="font-medium">
                            Is the Payment Screenshot appearing correctly?
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" required className="mt-2" />{" "}
                        <label className="font-medium">
                            Is the Payment is of Rs. 10?
                        </label>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="w-full bg-slate-100 p-2 rounded-lg">
                        <p className="text-center mb-2">Aadhar Card</p>
                        <img
                            className="object-contain rounded max-h-[700px] mx-auto mb-4"
                            src={aadharUrl}
                        />
                        <input type="checkbox" required className="mt-2" />
                        <label className="font-medium">
                            {" "}
                            Is Aadhar Number{" "}
                            <span className="text-red-500">
                                {" "}
                                {aadhar.slice(0, 4) +
                                    " " +
                                    aadhar.slice(4, 8) +
                                    " " +
                                    aadhar.slice(8, 12) +
                                    " " +
                                    aadhar.slice(12)}{" "}
                            </span>
                            same as in the image?
                        </label>
                    </div>
                    <div className="text-center w-full bg-slate-100 p-2 rounded-lg">
                        <p className="mb-2">Other Details</p>

                        <div className="grid grid-cols-3 font-normal text-sm text-left">
                            <label className="font-medium">Email: </label>
                            <span className="col-span-2">{email}</span>

                            <label className="font-medium">
                                Father's Name:{" "}
                            </label>
                            <span className="col-span-2">{fathersName}</span>

                            <label className="font-medium">
                                Mother's Name:{" "}
                            </label>
                            <span className="col-span-2">{mothersName}</span>

                            <label className="font-medium">School Name: </label>
                            <span className="col-span-2">{schoolName}</span>

                            <label className="font-medium">School ID: </label>
                            <span className="col-span-2">{schoolID}</span>

                            <label className="font-medium">
                                Medium of Study:{" "}
                            </label>
                            <span className="col-span-2">{mediumOfStudy}</span>

                            <label className="font-medium">
                                Aadhar Number:{" "}
                            </label>
                            <span className="col-span-2">{aadhar}</span>

                            <label className="font-medium">Created At: </label>
                            <span className="col-span-2">
                                {new Date($createdAt).toDateString()}
                            </span>

                            <label className="font-medium">Verified: </label>
                            <span className="col-span-2">
                                {verified ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>

                    {!verified && (
                        <button
                            type="submit"
                            className="bg-green-400 text-white p-2 rounded-md w-full mt-8"
                        >
                            Mark as Verified
                        </button>
                    )}
                </div>
            </div>

            {openPopup && (
                <PopUp
                    name={name}
                    mobileNumber={mobile}
                    passId={$id}
                    handlePopupClose={handlePopupClose}
                />
            )}
        </form>
    );
};

export default Card;
Card.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    mob: PropTypes.number,
    passId: PropTypes.number,
    paySlip: PropTypes.string,
    aadhar: PropTypes.string,
    schoolId: PropTypes.string,
};

const PopUp = ({ name, mobileNumber, passId, handlePopupClose }) => {
    let passUrl = `https://quizchamp.satyalok.in/success/pass/${passId}`;

    if (mobileNumber.toString().length === 10) {
        mobileNumber = `91${mobileNumber}`;
    } else if (mobileNumber.toString().length === 12) {
        mobileNumber = `+${mobileNumber}`;
    } else {
        alert("Invalid Mobile Number");
    }

    let message = `Hi ${name},\n\nThanks for registering for Quiz Champ 2024, organized by Satyalok.\n\nYour pass has been verified! Kindly visit ${passUrl} to download your pass.\n\nImportant Guidelines:\n1. Bring a cardboard for the exam.\n2. The exam will consist of MCQs on an OMR sheet.\n3. The questions will be based on General Knowledge, Current Affairs, and common theory questions from Physics, Chemistry, and SST (Social Studies). No numerical questions will be included.\n4. Please bring a printout of your pass and an identification card.\n\n*Quiz Date:* 08 June 2024, 5:00 PM - 6:15 PM\n*Venue:* Panchayat Bhavan, Gomia, Bokaro (JH)\n*Map Link*: https://maps.app.goo.gl/cH9tm1bvh7Nx2B4MA\n\n*Last date of registration:* 4 June 2024\n\nSee you at the event!\n\nBest regards,\nQuiz Champ 2024\nTeam Satyalok\n\nFor more info visit www.satyalok.in/quizchamp`;

    let encodedMessage = encodeURIComponent(message);

    // WhatsApp link
    let whatsappLink = `https://wa.me/${mobileNumber}?text=${encodedMessage}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePopupClose(e);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form
                className="bg-white p-4 rounded-lg"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-semibold">Document Verified</h1>
                <p className="text-gray-500">
                    The document has been verified successfully.
                </p>
                <p className="my-4 space-x-2 text-center">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        className="bg-green-400 text-white p-2 rounded-md w-full mt-8"
                    >
                        Send WhatsApp Message
                    </a>
                    <a
                        href={passUrl}
                        target="_blank"
                        className="bg-green-400 text-white p-2 rounded-md w-full mt-8"
                    >
                        Check Pass
                    </a>
                </p>

                <p className="text-gray-500">
                    <input type="checkbox" required className="mt-2" />{" "}
                    <label className="font-medium">
                        I have sent the WhatsApp message.
                    </label>
                </p>
                <button
                    type="submit"
                    className="bg-green-400 text-white p-2 rounded-md w-full mt-1"
                >
                    Close
                </button>
            </form>
        </div>
    );
};

PopUp.propTypes = {
    name: PropTypes.string,
    mobileNumber: PropTypes.number,
    passId: PropTypes.number,
};
