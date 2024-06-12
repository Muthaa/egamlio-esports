import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import Select, { StylesConfig } from "react-select";

interface Option {
    value: string;
    label: string;
}

const dateOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1).padStart(2, '0'),
}));

const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
    value: String(i + 1900),
    label: String(i + 1900),
}));


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedDate, setSelectedDate] = useState<Option | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<Option | null>(null);
    const [selectedYear, setSelectedYear] = useState<Option | null>(null);

    const customStyles: StylesConfig = {
        // Your custom styles
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    date: selectedDate?.value,
                    month: selectedMonth?.value,
                    year: selectedYear?.value,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Data was successfully sent to the server, handle success here
            console.log('Registration successful!');
        } catch (error) {
            // Handle error
            console.error('Error sending registration data:', error);
        }
    };
    

    return (
        <>
            <Head>
                <title>Egamlio - Esports and Gaming Courses Website NextJS Template</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
            </Head>
            <section className="login-reg">
                <div className="overlay pb-120">
                    <div className="container">
                        <div className="top-area pt-4 mb-30">
                            {/* Your top area content */}
                        </div>
                        <div className="row pt-120 d-flex justify-content-center">
                            <div className="col-xxl-6 col-xl-7">
                                <div className="login-reg-main text-center">
                                    <div className="form-area">
                                        <div className="section-text">
                                            <h4>Create Account</h4>
                                            <p>Sign Up to Egamlio and Start Learning!</p>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="single-input">
                                                        <label htmlFor="email">Email Address</label>
                                                        <div className="input-box">
                                                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                                                        </div>
                                                    </div>
                                                    <div className="single-input">
                                                        <label htmlFor="name">User Name</label>
                                                        <div className="input-box">
                                                            <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter User Name" />
                                                        </div>
                                                    </div>
                                                    <div className="single-input">
                                                        <label htmlFor="passInput">Password</label>
                                                        <div className="input-box">
                                                            <input type="password" id="passInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                                                            {/* Show/Hide Password icon */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-input">
                                                    <label>Date of Birth</label>
                                                    <div className="select-area gap-3 d-flex flex-wrap align-items-center">
                                                        <Select
                                                            value={selectedDate}
                                                            onChange={(option) => setSelectedDate(option as Option)}
                                                            options={dateOptions}
                                                            styles={customStyles}
                                                        />
                                                        <Select
                                                            value={selectedMonth}
                                                            onChange={(option) => setSelectedMonth(option as Option)}
                                                            options={monthOptions}
                                                            styles={customStyles}
                                                        />
                                                        <Select
                                                            value={selectedYear}
                                                            onChange={(option) => setSelectedYear(option as Option)}
                                                            options={yearOptions}
                                                            styles={customStyles}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="cmn-btn mt-40 w-100">Sign Up</button>
                                        </form>
                                        {/* Social login options */}
                                    </div>
                                    <div className="account mt-30">
                                        <p>Have an account? <Link href="login">login</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;