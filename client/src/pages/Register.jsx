import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'userName') {
            setIsUsernameValid(usernameRegex.test(value));
        } else if (name === 'email') {
            setIsEmailValid(emailRegex.test(value));
        } else if (name === 'password') {
            const isValid = passwordRegex.test(value);
            setIsPasswordValid(isValid);
        }

    };


    const handleEmailBlur = () => {
        setIsEmailValid(emailRegex.test(formData.email));
    };

    const canSubmit = () => {
        return isEmailValid && isPasswordValid && formData.password === formData.confirmPassword && isUsernameValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit()) {
            alert("Please check your input");
            return;
        }

        try {
            await axios.post(`http://localhost:4500/api/auth/register`, formData);
            alert('User registered successfully');
            setFormData({
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            navigate('/signIn');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    const isFormValid = () => {
        const { userName, email, password, confirmPassword } = formData;
        const isEveryFieldFilled = userName && email && password && confirmPassword;
        const isEmailValid = emailRegex.test(email);
        const doPasswordsMatch = password === confirmPassword;
        const isPasswordValid = passwordRegex.test(password);

        return isEveryFieldFilled && isEmailValid && doPasswordsMatch && isPasswordValid;
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>New User Registration</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>

                <label htmlFor="userName" className={`${isUsernameValid ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}>
                    Username
                </label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`${isUsernameValid === null
                        ? ''
                        : isUsernameValid
                            ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700'
                            : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                        } text-sm rounded-lg focus:ring-2 block w-full p-2.5`}
                    placeholder="Username"
                />
                {isUsernameValid === false && (
                    <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">Oops!</span> Username must be alphanumeric and 3-20 characters long.
                    </p>
                )}

                <label htmlFor="email" className={`${isEmailValid ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}>
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    className={`${isEmailValid === null
                        ? ''
                        : isEmailValid
                            ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700'
                            : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                        } text-sm rounded-lg focus:ring-2 block w-full p-2.5`}
                    placeholder="Email"
                />
                {isEmailValid === false && (
                    <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">Oops!</span> Please enter a valid email address.
                    </p>
                )}

                <label htmlFor="password" className={`${isPasswordValid ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}>
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${isPasswordValid === null
                        ? ''
                        : isPasswordValid
                            ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700'
                            : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                        } text-sm rounded-lg focus:ring-2 block w-full p-2.5`}
                    placeholder="Password" />
                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>
                    <p>Password requirements:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li>Length is 8-30 characters</li>
                        <li>Includes a special character (@$!%*?&)</li>
                        <li>Contains a number</li>
                    </ul>
                </div>
                <label htmlFor="confirmPassword" className={`${formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-700' : 'text-black-700'} block mb-2 text-sm font-medium`}>
                    Confirm Password
                </label>
                <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${formData.password && formData.confirmPassword
                        ? formData.password === formData.confirmPassword
                            ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700'
                            : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                        : ''
                        } text-sm rounded-lg focus:ring-2 block w-full p-2.5`}
                    placeholder="Confirm Password"
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="text-red-500 text-sm mt-2">
                        <span className="font-medium">Oops!</span> Passwords do not match.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isFormValid()}
                    style={{
                        padding: '10px',
                        backgroundColor: isFormValid() ? '#4CAF50' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isFormValid() ? 'pointer' : 'default',
                    }}
                >
                    Register
                </button>

            </form>
        </div>
    );
};

export default Register;
