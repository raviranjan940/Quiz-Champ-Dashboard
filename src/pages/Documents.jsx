import { useEffect, useState } from "react";
import { appwriteClient } from "../lib/appwrite";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [verifiedDocuments, setVerifiedDocuments] = useState([]);
    const [unverifiedDocuments, setUnverifiedDocuments] = useState([]);
    const [includePhoto, setIncludePhoto] = useState(false);

    useEffect(() => {
        document.title = "Documents";
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

    const exportPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4",
        });
        doc.autoTable({ html: "#recordsTable" });
        const fileName = `table_${new Date().toLocaleDateString()}.pdf`;
        doc.save(fileName);
    };

    const exportToExcel = () => {
        // Get the table data
        const table = document.getElementById("recordsTable");
        const workbook = XLSX.utils.table_to_book(table);
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // Create a Blob from the buffer
        const data = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(data);
        link.download = "table.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        console.log("documents", documents);
    }, [documents]);

    return (
        <>
            <div className="overflow-hidden print:overflow-y-auto w-full max-w-7xl m-auto">
                <div className="print:hidden">
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

                {/* print btn */}
                <div className="flex justify-center gap-3 print:hidden">
                    <button
                        onClick={window.print}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                        <i className="fas fa-print mr-1"></i>
                        Print PDF
                    </button>

                    {/* <button
                        onClick={exportToExcel}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                        <i className="fas fa-file-excel mr-1"></i>
                        Export to Excel
                    </button> */}
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="includePhoto"
                        name="includePhoto"
                        checked={includePhoto}
                        onClick={() => setIncludePhoto(!includePhoto)}
                    />
                    <label className="text-center print:hidden">
                        {" "}
                        Include Photo & Signature Area
                    </label>
                </div>

                <div className="overflow-x-auto ">
                    <p className="text-center font-semibold grid grid-cols-5 gap-2">
                        <span>No. of Documents: {documents.length}</span>
                        <span>
                            No. of Verified Documents:{" "}
                            {verifiedDocuments.length}
                        </span>
                        <span>
                            No. of Unverified Documents:{" "}
                            {unverifiedDocuments.length}
                        </span>

                        <span>
                            No. of Hindi Mode Candidates :{" "}
                            {verifiedDocuments.filter(
                                (document) => document.mediumOfStudy === "Hindi"
                            ).length}
                        </span>
                        <span>
                            No. of English Mode Candidates :{" "}
                            {verifiedDocuments.filter(
                                (document) => document.mediumOfStudy === "English"
                            ).length}
                        </span>
                    </p>

                    <div id="records" className="pb-[200px]">
                        <div>
                            {/* forst mediumofstudy Hindi and then mediumofstudy English */}
                            {verifiedDocuments
                                .sort((a, b) =>
                                    b.mediumOfStudy.localeCompare(
                                        a.mediumOfStudy
                                    )
                                )
                                .map((document) => {
                                    if (!includePhoto) {
                                        document.includePhoto = false;
                                    } else {
                                        document.includePhoto = true;
                                    }

                                    return (
                                        <ListRecord
                                            record={document}
                                            key={document.$id}
                                        />
                                    );
                                })}
                        </div>

                        <div className="flex justify-center">
                            Unverified Documents
                        </div>
                        <div>
                            {unverifiedDocuments.map((document) => {
                                if (!includePhoto) {
                                    document.includePhoto = false;
                                } else {
                                    document.includePhoto = true;
                                }

                                return (
                                    <ListRecord
                                        record={document}
                                        key={document.$id}
                                    />
                                );
                            })}
                        </div>

                        <p>
                            Please keep this document safe and secure. This is a digital document and can be verified by the authorities only. This document is not a valid document for any legal purpose. This document is generated by Quiz Champ and is only for the purpose of the quiz competition.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Documents;

const ListRecord = ({ record }) => {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (record?.includePhoto && record?.photo) {
            appwriteClient.getImageById(record?.photo).then((response) => {
                setPhotoUrl(response);
            });
        }
    }, [record]);

    return (
        <div className="flex gap-2 p-2 border-black border my-2 text-sm break-inside-avoid">

            <div className="grid grid-cols-5 gap-2 w-full">
                <p>
                    <p className="font-semibold">Name: </p>
                    {record.name}
                </p>
                <p>
                    <p className="font-semibold">Father's Name: </p>
                    {record.fathersName}
                </p>
                <p>
                    <p className="font-semibold">Mother's Name: </p>
                    {record.mothersName}
                </p>
                <p>
                    <p className="font-semibold">School ID: </p>
                    {record.schoolID}
                </p>
                <p>
                    <p className="font-semibold">Class: </p>
                    {record.class}
                </p>
                <p>
                    <p className="font-semibold">School Name: </p>
                    {record.schoolName}
                </p>
                <p>
                    <p className="font-semibold">Medium of Study: </p>
                    {record.mediumOfStudy}
                </p>
                <p>
                    <p className="font-semibold">Mobile: </p>
                    {record.mobile}
                </p>
                <p>
                    <p className="font-semibold">Aadhar: </p>
                    {record.aadhar}
                </p>
                {/* <p>
                    <p className="font-semibold">Email: </p>
                    {record.email}
                </p> */}
                <p>
                    <p className="font-semibold">Digital Verified: </p>
                    {record.verified ? "Yes" : "No"}
                </p>
                <p>
                    <p className="font-semibold">Pass Id: </p>
                    {record.$id}
                </p>
                <p>
                    <p className="font-semibold">OMR No.: </p>
                </p>
                <p>
                    <p className="font-semibold">Verified By: </p>
                </p>
            </div>
            {record.includePhoto && (
                <div className="w-[15%] flex flex-col justify-end items-center border">
                    <p className="font-medium text-center text-xs">
                        Signature with date
                    </p>
                </div>
            )}
            {/* <td className="border p-2">{record.$id}</td>
            <td className="border p-2">{record.name}</td>
            <td className="border p-2">{record.fathersName}</td>
            <td className="border p-2">{record.mothersName}</td>
            <td className="border p-2">{record.schoolID}</td>
            <td className="border p-2">{record.class}</td>
            <td className="border p-2">{record.schoolName}</td>
            <td className="border p-2">{record.mediumOfStudy}</td>
            <td className="border p-2">{record.mobile}</td>
            <td className="border p-2">{record.aadhar}</td>
            <td className="border p-2">{record.email}</td>
            <td className="border p-2">{record.verified ? "Yes" : "No"}</td> */}
        </div>
    );
};
