import React, { useState, useEffect } from 'react';
import './Header.css';
import { useQuery } from '@apollo/client';
import GET_CURRENT_USER from '../../graphql/queries/get_current_user';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { useUnitSystemsQuery } from '../../lib/hooks/useUnitSystemsQuery';

const Header: React.FC = () => {
    const [selectedUnit, setSelectedUnit] = useState('Choose the unit system..');
    const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
    const [isUsernameDropdownOpen, setIsUsernameDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');

    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_CURRENT_USER);
    const { loading: unitSystemsLoading, error: unitSystemsError, data: unitSystemsData } = useUnitSystemsQuery();

    useEffect(() => {
        const token = Cookies.get('access_token');
        console.log("token", document.cookie);
        if (token) {
            const decodedToken: any = jwtDecode(token);
            setUsername(decodedToken.username);
        } else if (userData && userData.me) {
            setUsername(userData.me.username);
            Cookies.set("role", userData.me.groups[0].name);
        }
    }, [userData]);

    if (userLoading || unitSystemsLoading) console.log("Loading...");
    if (userError) console.log("Error:" + userError.message);
    if (unitSystemsError) console.log("Error:" + unitSystemsError.message);

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
                            {unitSystemsData?.unitSystems.map((unit: any) => (
                                <button key={unit.id} onClick={() => handleUnitSelection(unit.name.en)}>
                                    {unit.name.en}
                                </button>
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
