import React from "react";
import { Link } from "react-router-dom";
import './LogInWindow.css';

const LogInWindow: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="heading">
                    <h1>Log In</h1>
                </div>
                <div className="login-button">
                    <Link to="/home" className="button-content" style={{textDecoration: 'none'}}>
                        <div className="button-icon">
                            <img src="/src/assets/MicrosoftLogo.png" alt="Microsoft Logo" />
                        </div>
                        <div className="button-info">
                            <p>Log in via Microsoft</p>
                        </div>
                    </Link>
                </div>
                <div className="line"></div>
                <div className="heading">
                    <p>In order to log in to the app, you need to log in with Microsoft.</p>
                </div>
            </div>
        </div>
    );
};

export default LogInWindow;
