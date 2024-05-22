import React, { useEffect, useState } from 'react';
import '../styles/LoginForm.css';
import axios from 'axios';

function LoginForm({ setIsLogin, setIsLoading }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalidLogin, setIsInvalidLogin] =  useState(false);
    const date = new Date();
    const hours = date.getHours();

    const fetchData = async () => {
        try {
            // สร้าง URL พร้อม query string
            const response = await axios.get('http://localhost:3307/auth-login', {
                params: {
                    username: username,
                    password: password
                }
            });

            // setLoginData(response.data);
            return response.data;

        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const checkTimeMessage = (date) => {
        if (Number(date) > 6 && Number(date) < 12) {
            return 'ตอนเช้า 🌤️'
        }
        if (Number(date) === 12) {
            return 'ตอนเที่ยง ☀️'
        }
        if (Number(date) > 12 && Number(date) < 16) {
            return 'ตอนบ่าย ☀️'
        }
        if (Number(date) > 16 && Number(date) < 18) {
            return 'ตอนเย็น 🌥️'
        } else {
            return 'ตอนมืด 🌖'
        }
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const authLogin = async event => {
        await setIsLoading(true);
        event.preventDefault(); // ป้องกันการ submit ตามปกติ
        const data = await fetchData();
        if (data.length > 0) {
            setIsLogin(true);
            await setIsLoading(false);
        }
        if (data.length === 0) {
            await setIsLoading(false);
            await setIsLogin(false)
            setIsInvalidLogin(true);

        }
    };
    
    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">สวัสดี {checkTimeMessage(hours)}</h1>
                <h2 className="login-title">กรุณาเข้าสู่ระบบ</h2>
                <form className="form-box" onSubmit={authLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <div style={{color: 'red', marginTop: '8px'}}>{isInvalidLogin && 'ชื่อผู้ใช้หรือรหัสผ่านของคุณไม่ถูกต้อง กรุณาลองใหม่'}</div>
            </div>
        </div>
    );
}

export default LoginForm;
