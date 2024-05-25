import React, { useState } from 'react';
import './Header.css';
import {useQuery} from "@apollo/client";
import get_current_user from "../../graphql/queries/get_current_user.ts";
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';

const Header: React.FC = () => {
    const [selectedUnit, setSelectedUnit] = useState('Choose the unit..');
    const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
    const [isUsernameDropdownOpen, setIsUsernameDropdownOpen] = useState(false);

    const { loading, error, data } = useQuery(get_current_user);
    const { username } = data.me;
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    const token = Cookies.getItem('jwt_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);  // Посмотрите на структуру декодированного токена
    }

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
        //  логика для выхода пользователя
    };

    return (
        <div className="header">
            <div className="header-left">
            </div>

            <div className="header-center">
                <div className="choose-unit" onClick={toggleUnitDropdown}>
                    <p>{selectedUnit}</p>
                    {isUnitDropdownOpen && (
                        <div className="dropdown">
                            <button onClick={() => handleUnitSelection('System 1')}>System 1</button>
                            <button onClick={() => handleUnitSelection('System 2')}>System 2</button>
                            <button onClick={() => handleUnitSelection('System 3')}>System 3</button>
                            <button onClick={() => handleUnitSelection('System 4')}>System 4</button>
                            <button onClick={() => handleUnitSelection('System 5')}>System 5</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="header-right">
                <div className="username" onClick={toggleUsernameDropdown}>
                    <p>{ username }</p>
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
