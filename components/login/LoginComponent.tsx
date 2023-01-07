'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { setCookie } from 'cookies-next';
import './login.scss'
import axios from 'axios';

const LoginComponent = () => {
    const router = useRouter()
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e:any) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogin = async (e:any) => {
        e.preventDefault();
        try {
            const result=await axios.post(`http://localhost:8000/api/v1/login`,inputData)
            localStorage.setItem("user", JSON.stringify(result.data.result));
            router.push('/messenger')
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='login'>
            <form className='login__card' onSubmit={handleLogin}>
                <input
                    className='login__input-field'
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputData.email}
                    onInput={handleChange}
                />
                <br/>
                <input
                    className='login__input-field'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputData.password}
                    onInput={handleChange}
                />
                <br/>
                <button type="submit" className='login__btn'>login</button>
            </form>
        </div>
    );
};

export default LoginComponent;