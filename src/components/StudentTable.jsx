import React, { useState, useEffect } from 'react';
import '../styles/StudentTable.css';
import axios from 'axios';

function StudentTable({refetch}) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // เรียกใช้ฟังก์ชัน fetchData เมื่อ component นี้ถูกโหลดขึ้นมาครั้งแรก
        fetchData();
    }, [refetch]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3307/student');

            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>Student Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
