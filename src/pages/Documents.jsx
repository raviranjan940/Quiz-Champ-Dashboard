import { useEffect, useState } from "react";
import { appwriteClient } from "../lib/appwrite";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [verifiedDocuments, setVerifiedDocuments] = useState([]);
    const [unverifiedDocuments, setUnverifiedDocuments] = useState([]);

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
                <div>
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
                <div className="flex justify-center gap-3">
                    <button
                        onClick={exportPDF}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                        <i className="fas fa-print mr-1"></i>
                        Print PDF
                    </button>

                    <button
                        onClick={exportToExcel}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                        <i className="fas fa-file-excel mr-1"></i>
                        Export to Excel
                    </button>
                </div>

                <div className="overflow-x-auto ">
                    <table
                        className="w-full whitespace-nowrap m-4"
                        id="recordsTable"
                    >
                        <thead>
                            <tr>
                                <th className="border border-gray-300">
                                    Created At
                                </th>
                                <th className="border border-gray-300">
                                    Pass ID
                                </th>
                                <th className="border border-gray-300">Name</th>
                                <th className="border border-gray-300">
                                    Email
                                </th>
                                <th className="border border-gray-300">
                                    Mobile
                                </th>
                                <th className="border border-gray-300">
                                    Class
                                </th>
                                <th className="border border-gray-300">
                                    School Name
                                </th>
                                <th className="border border-gray-300">
                                    Verified
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {verifiedDocuments.map((document) => (
                                <tr
                                    key={document.$id}
                                    className={`${
                                        document.verified
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    <td className="border px-3 py-1 border-gray-300">
                                        {new Date(
                                            document.$createdAt
                                        ).toDateString()}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.$id}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.name}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.email}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.mobile}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.class}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.schoolName}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.verified
                                            ? "Verified"
                                            : "Unverified"}
                                    </td>
                                </tr>
                            ))}
                            {unverifiedDocuments.map((document) => (
                                <tr
                                    key={document.$id}
                                    className={`${
                                        document.verified
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    <td className="border px-3 py-1 border-gray-300">
                                        {new Date(
                                            document.$createdAt
                                        ).toDateString()}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.$id}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.name}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.email}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.mobile}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.class}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.schoolName}
                                    </td>
                                    <td className="border px-3 py-1 border-gray-300">
                                        {document.verified
                                            ? "Verified"
                                            : "Unverified"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Documents;
