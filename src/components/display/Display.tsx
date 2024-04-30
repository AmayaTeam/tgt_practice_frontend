import React from "react";
import "./Display.css"; // Подключаем стили

const Display: React.FC = () => {
    return (
        <div className="display-container">
            <div className="display">
                <div className="display-content">
                    <div className="display-content-title">
                        <div className="title">
                            <div className="heading-of-param">
                                <h4 className="heading-of-param">SN :</h4>
                            </div>
                            {/*<div>*/}
                                <input type="text" defaultValue="Default"/>
                            {/*</div>*/}
                        </div>
                        <div className="title">
                            <div className="display-content-titles">
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Group :</h4>
                                    </div>
                                    {/*<div>*/}
                                        <input type="text" defaultValue="Prototypes"/>
                                    {/*</div>*/}
                                </div>
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Module Type :</h4>
                                    </div>
                                    {/*<div>*/}
                                        <input type="text" defaultValue="Chorus XB EnP"/>
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="title">
                            <div className="heading-of-param">
                            <h4 className="heading-of-param">Housing :</h4>
                            </div>
                            {/*<div>*/}
                                <input type="text" defaultValue="Chorus XB EnP: Default"/>
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="display-content-info">
                        <div className="display-content-info-params">
                            <div className="params">
                                <h4>Housing Params</h4>
                                <div className="Housing_params-content">
                                    <div className="parametr">
                                        <p  className="title_parametrs">Length* :</p>
                                        <p className="num_parametrs">1220</p>
                                        <p className="unit_parametrs" >mm</p>
                                    </div>
                                    <div className="parametr">
                                        <p  className="title_parametrs">Weight :</p>
                                        <p className="num_parametrs">15</p>
                                        <p className="unit_parametrs">kg</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">COMP STR :</p>
                                        <p className="num_parametrs">5000</p>
                                        <p className="unit_parametrs">kg</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">OD* :</p>
                                        <p className="num_parametrs">42</p>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">OD Closed :</p>
                                        <p className="num_parametrs">42</p>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">OD Opened :</p>
                                        <p className="num_parametrs">42</p>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div className="params">

                            </div>
                            <div className="params">
                                <h4>Housing Sensors</h4>
                            </div>
                        </div>

                        <div className="display-content-info-image">
                            <img src="/src/assets/testImage.png"/>
                            <div className="info-image-buttons">
                                <button>Export Image</button>
                                <button>Import Image</button>
                            </div>
                        </div>
                    </div>
                    <div className="display-content-buttons">
                        <button>Save</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
