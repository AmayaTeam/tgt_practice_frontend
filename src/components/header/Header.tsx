import React, { useState, useEffect } from 'react';
import './Header.css';
import { useQuery } from '@apollo/client';
import GET_CURRENT_USER from 'src/graphql/queries/get_current_user';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const Header: React.FC = () => {
    const [selectedUnit, setSelectedUnit] = useState('Choose the unit..');
    const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
    const [isUsernameDropdownOpen, setIsUsernameDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');

    // Fetch the current user using GraphQL
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    useEffect(() => {
        const token = Cookies.get('access_token');
        console.log("token", document.cookie);
        if (token) {
            const decodedToken: any = jwtDecode(token);
            setUsername(decodedToken.username);
        } else if (data && data.me) {
            setUsername(data.me.username);
            Cookies.set("role", data.me.groups[0].name);
        }
    }, [data]);

    if (loading) console.log("Loading...");
    if (error) console.log("Error:" + error.message);

    const toggleUnitDropdown = () => {
        setIsUnitDropdownOpen(!isUnitDropdownOpen);
    };

    const toggleUsernameDropdown = () => {
        setIsUsernameDropdownOpen(!isUsernameDropdownOpen);
    };

    const handleUnitSelection = (unit: string) => {
        setSelectedUnit(unit);
        setIsUnitDropdownOpen(false);
    };

    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('refresh_token');
        window.location.href = 'http://localhost:8000/logout'; // Redirect to login page
    };

    return (
        <div className="header">
            <div className="header-left">
                {/* You can add left-side content here if needed */}
            </div>

            <div className="header-center">
                <div className="choose-unit" onClick={toggleUnitDropdown}>
                    <p>{selectedUnit}</p>
                    {isUnitDropdownOpen && (
                        <div className="dropdown">
                            {['System 1', 'System 2', 'System 3', 'System 4', 'System 5'].map((unit) => (
                                <button key={unit} onClick={() => handleUnitSelection(unit)}>{unit}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="header-right">
                <div className="username" onClick={toggleUsernameDropdown}>
                    <p>{username}</p>
                    {isUsernameDropdownOpen && (
                        <div className="dropdown">
                            <button onClick={handleLogout}><p>LogOut</p></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
