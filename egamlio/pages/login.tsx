import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


    // Function to handle password visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle login
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('Email and password are required');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Invalid email format');
            return;
        }

        try {
            // Sanitize input fields
            // const sanitizedEmail = encodeURIComponent(email.trim());
            // const sanitizedPassword = encodeURIComponent(password.trim());

            // Call your API to authenticate user
            const response = await fetch('https://stemprotocol.codefremics.com/api/v2/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email.trim(), password: password.trim() }),
                // body: JSON.stringify({ username: sanitizedEmail, password: sanitizedPassword }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.access_token) {
                    // Save access token to localStorage or cookies for future requests
                    localStorage.setItem('access_token', data.access_token);

                    router.push('/index-3');
                } else {
                    setError('Login failed');
                }
                
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Head>
                <title>Egamlio - Login</title>
            </Head>
            <section className="login-reg">
                <div className="overlay pb-120">
                    <div className="container">
                        <div className="top-area pt-4 mb-30">
                            <div className="row d-flex align-items-center">
                                <div className="col-sm-5 col">
                                    <Link className="back-home" href="/">
                                        <img src="/images/icon/left-icon.png" alt="image" />
                                        Back To Egamlio
                                    </Link>
                                </div>
                                <div className="col-sm-2 text-center col">
                                    <Link href="/index-3">
                                        <img src="/images/logo.png" alt="image" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-120 d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login-reg-main text-center">
                                    <div className="form-area">
                                        <div className="section-text">
                                            <h4>Welcome Back!</h4>
                                            <p>We're so excited to see you again! Log In to your Egamlio Account!</p>
                                        </div>
                                        <form onSubmit={handleLogin}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="single-input">
                                                        <label htmlFor="email">Email Address</label>
                                                        <div className="input-box">
                                                            <input type="email" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        </div>
                                                    </div>

                                                                {/* Password input */}
                                                    <div className="single-input">
                                                        <label htmlFor="password">Password</label>
                                                        <div className="input-box">
                                                            <input 
                                                                type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                                                                id="password" 
                                                                placeholder="Enter Your Password"
                                                                value={password} 
                                                                onChange={(e) => setPassword(e.target.value)} 
                                                            />
                                                            <img 
                                                                className="showPass" 
                                                                src={showPassword ? "/images/icon/show-hide.png" : "/images/icon/show-hide.png"} 
                                                                alt="icon" 
                                                                onClick={togglePasswordVisibility} // Toggle password visibility when clicked
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <div className="single-input">
                                                        <label htmlFor="password">Password</label>
                                                        <div className="input-box">
                                                            <input type="password" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                            <img className="showPass" src="/images/icon/show-hide.png" alt="icon" />
                                                        </div>
                                                    </div> */}
                                                    <div className="remember-me">
                                                        <label className="checkbox-single d-flex align-items-center">
                                                            <span className="left-area">
                                                                <span className="checkbox-area d-flex">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmark"></span>
                                                                </span>
                                                                <span className="item-title d-flex align-items-center">
                                                                    <span>Remember Me</span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                        <Link href="#">Forgot Password</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {error && <div className="error-message">{error}</div>}
                                            <button type="submit" className="cmn-btn mt-40 w-100">Login</button>
                                        </form>
                                        <div className="reg-with">
                                            <div className="or">
                                                <p>OR</p>
                                            </div>
                                            <div className="social">
                                                <ul className="footer-link d-flex justify-content-center align-items-center">
                                                    <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                                                    <li><Link href="#"><i className="fab fa-google"></i></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitch"></i></Link></li>
                                                    <li><Link href="#"><i className="fab fa-apple"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account mt-30">
                                        <p>Don't have an account? <Link href="register">Sign Up Here</Link></p>
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

export default Login;
