import { useEffect, useState } from "react";
import { appwriteClient } from "../lib/appwrite";
import * as XLSX from "xlsx";

// Utility function to convert UTC time to IST and extract time part
const convertToIST = (utcTime) => {
    const date = new Date(utcTime);
    // Calculate IST offset (UTC+5:30)
    const istOffset = 330 * 60 * 1000; // 330 minutes in milliseconds
    const istTime = new Date(date.getTime() + istOffset);
    // Extract and format time as HH:mm:ss
    return istTime.toISOString().split("T")[1].split(".")[0]; // Split to get time part only
};

const PrstAbstData = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [updatedTime, setUpdatedTime] = useState(null);
    const [sortCriteria, setSortCriteria] = useState("attendance");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await appwriteClient.getDocuments();
            const studentsData = response.documents;
            console.log(studentsData);
            setStudents(studentsData);

            // Calculate the counts for present and absent students
            const present = studentsData.filter((student) => student.present).length;
            const absent = studentsData.length - present;

            setPresentCount(present);
            setAbsentCount(absent);
            setUpdatedTime(new Date().toLocaleString());
        } catch (error) {
            console.error("Error fetching student data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const sortStudents = (studentsList) => {
        switch (sortCriteria) {
            case "attendance":
                return studentsList.sort((a, b) =>
                    a.present === b.present ? 0 : a.present ? -1 : 1
                );
            case "hindiFirst":
                return studentsList.sort((a, b) => {
                    if (a.mediumOfStudy === b.mediumOfStudy) {
                        return a.present === b.present ? 0 : a.present ? -1 : 1;
                    }
                    return a.mediumOfStudy === "Hindi" ? -1 : 1;
                });
            case "englishFirst":
                return studentsList.sort((a, b) => {
                    if (a.mediumOfStudy === b.mediumOfStudy) {
                        return a.present === b.present ? 0 : a.present ? -1 : 1;
                    }
                    return a.mediumOfStudy === "English" ? -1 : 1;
                });
            case "presentFirst":
                return studentsList.sort((a, b) =>
                    a.present === b.present ? 0 : a.present ? -1 : 1
                );
            case "absentFirst":
                return studentsList.sort((a, b) =>
                    a.present === b.present ? 0 : b.present ? -1 : 1
                );
            default:
                return studentsList;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Present and Absent Students</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={fetchData}
                    disabled={loading}
                >
                    {loading ? "Refreshing..." : "Refresh"}
                </button>

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={exportToExcel}
                >
                    Export to Excel
                </button>
                <div className="text-gray-700">
                    <p>Present: {presentCount}</p>
                    <p>Absent: {absentCount}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="sortCriteria" className="mr-2">Sort By:</label>
                <select
                    id="sortCriteria"
                    className="border rounded p-2"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                >
                    <option value="attendance">Attendance</option>
                    <option value="hindiFirst">Hindi First</option>
                    <option value="englishFirst">English First</option>
                    <option value="presentFirst">Present First</option>
                    <option value="absentFirst">Absent First</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300" id="recordsTable">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Attendance</th>
                            <th className="py-2 px-4 border-b">Updated At</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Father's Name</th>
                            <th className="py-2 px-4 border-b">Mother's Name</th>
                            <th className="py-2 px-4 border-b">Class</th>
                            <th className="py-2 px-4 border-b">School Name</th>
                            <th className="py-2 px-4 border-b">Medium of Study</th>
                            <th className="py-2 px-4 border-b">Mobile</th>
                            <th className="py-2 px-4 border-b">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortStudents(students).map((student) => (
                            <tr
                                key={student.$id}
                                className={
                                    student.present && student.verified
                                        ? "bg-green-100"
                                        : student.present && !student.verified
                                        ? "bg-yellow-100"
                                        : !student.present && !student.verified
                                        ? "bg-blue-100"
                                        : "bg-red-100"
                                }
                            >
                                <td className="py-2 px-4 border-b">
                                    {student.present ? "Present" : "Absent"}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {convertToIST(student.$updatedAt)}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.name}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.fathersName}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.mothersName}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.class}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.schoolName}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.mediumOfStudy}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.mobile}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {student.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrstAbstData;
