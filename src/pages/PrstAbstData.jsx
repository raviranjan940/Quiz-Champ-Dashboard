import { useEffect, useState } from "react";
import { appwriteClient } from "../lib/appwrite";

const PrstAbstData = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [updatedTime, setUpdatedTime] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await appwriteClient.getDocuments();
            const studentsData = response.documents;
            setStudents(studentsData);

            // Calculate the counts for present and absent students
            const present = studentsData.filter(student => student.present).length;
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
                <div className="text-gray-700">
                    {/* <p>Last Updated: {updatedTime ? updatedTime : "Fetching..."}</p> */}
                    <p>Present: {presentCount}</p>
                    <p>Absent: {absentCount}</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Attendance</th>
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
                        {students
                            .sort((a, b) => (a.present === b.present ? 0 : a.present ? -1 : 1))
                            .map((student) => (
                                <tr
                                    key={student.$id}
                                    className={student.present ? "bg-green-100" : "bg-red-100"}
                                >
                                    <td className="py-2 px-4 border-b">
                                        {student.present ? "Present" : "Absent"}
                                    </td>
                                    <td className="py-2 px-4 border-b">{student.name}</td>
                                    <td className="py-2 px-4 border-b">{student.fathersName}</td>
                                    <td className="py-2 px-4 border-b">{student.mothersName}</td>
                                    <td className="py-2 px-4 border-b">{student.class}</td>
                                    <td className="py-2 px-4 border-b">{student.schoolName}</td>
                                    <td className="py-2 px-4 border-b">{student.mediumOfStudy}</td>
                                    <td className="py-2 px-4 border-b">{student.mobile}</td>
                                    <td className="py-2 px-4 border-b">{student.email}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrstAbstData;
