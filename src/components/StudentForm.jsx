import React, { useState } from 'react';
import '../styles/student.css';
import axios from 'axios';

function StudentForm({setIsLoading, setRefetch }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const createStudentData = async () => {
        try {
            const response = await axios.post('http://localhost:3307/create-student', {
                name: name,
                age: age,
                email: email,
                phone: phone
            });
            return response.data;

        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleAgeChange = event => {
        setAge(event.target.value);
    };
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = event => {
        setPhone(event.target.value);
    };

    const authLogin = async event => {
        await setIsLoading(true);
        event.preventDefault(); // ป้องกันการ submit ตามปกติ
        const data = await createStudentData();
        await setRefetch(true);
        if (data.affectedRows > 0) {
            await setIsLoading(false);
        }
        if (data.affectedRows === 0) {
            await setIsLoading(false);
        }
    };

    return (
        <form onSubmit={authLogin}>
            <h1>กรอกข้อมูลนักเรียน-นักศึกษา</h1>
            <input
                type="text"
                name="username"
                value={name}
                onChange={handleNameChange}
                required
                placeholder="กรอกชื่อ-นามสกุล"
            />
            <input type="number" name="age" value={age} onChange={handleAgeChange} required placeholder="กรอกอายุ" />
            <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                required
                placeholder="กรอกเบอร์โทรศัพท์"
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="กรอกอีเมล"
            />
            <button type="submit" name="submit">
                บันทึก
            </button>
        </form>
    );
}

export default StudentForm;
