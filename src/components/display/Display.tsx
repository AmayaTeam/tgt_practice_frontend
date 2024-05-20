import React from "react";
import "./Display.css";
import useToolModuleQuery from "../../lib/hooks/tool_module.ts";

interface DisplayProps {
    selectedItemId: string | null;
}

const Display: React.FC<DisplayProps> = ({ selectedItemId }) => {
    const { loading, error, data } = useToolModuleQuery(selectedItemId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const img = "data:image/png;base64," + data.image;
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
                            <input type="text" defaultValue={data.sn}/>
                            {/*</div>*/}
                        </div>
                        <div className="title">
                            <div className="display-content-titles">
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Group :</h4>
                                    </div>
                                    {/*<div>*/}
                                    <input type="text" defaultValue={data.rModuleTypeId.rModulesGroupId.name}/>
                                    {/*</div>*/}
                                </div>
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Module Type :</h4>
                                    </div>
                                    {/*<div>*/}
                                    <input type="text" defaultValue={data.rModuleTypeId.name}/>
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="title">
                            <div className="heading-of-param">
                                <h4 className="heading-of-param">Housing :</h4>
                            </div>
                            {/*<div>*/}
                            <input type="text" defaultValue={data.rModuleTypeId.rModulesGroupId.name + ":" + data.sn}/>
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="display-content-info">
                        <div className="display-content-info-params">
                            <div className="params">
                                <h4>Housing Params</h4>
                                <div className="Housing_params-content">
                                    <div className="parametr">
                                        <p className="title_parametrs">Length* :</p>
                                        <input className="num_parametrs" defaultValue={Number(data.dbtlength).toFixed(2)}/>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">Weight :</p>
                                        <input className="num_parametrs" defaultValue={Number(data.dbtweight).toFixed(2)}/>
                                        <p className="unit_parametrs">kg</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">COMP STR :</p>
                                        <input className="num_parametrs" defaultValue={Number(data.dbtcompStr).toFixed(2)}/>
                                        <p className="unit_parametrs">kg</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">OD* :</p>
                                        <input className="num_parametrs" defaultValue={Number(data.dbtmaxOd).toFixed(2)}/>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">OD Closed :</p>
                                        <input className="num_parametrs" defaultValue={Number(data.dbtmaxOdCollapsed).toFixed(2)}/>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div className="parametr">
                                        <p className="title_parametrs">OD Opened :</p>
                                        <input className="num_parametrs" defaultValue={Number(data.dbtmaxOdOpened).toFixed(2)}/>
                                        <p className="unit_parametrs">mm</p>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>

                            <div className="params">
                                <h4>Housing Sensors</h4>
                                {data.toolinstalledsensorSet.map((sensor, index) => (
                                    <div className="Housing_params-content" key={index}>
                                        <div className="parametr">
                                            <p className="title_parametrs">Name: </p>
                                            <input type="text" defaultValue={sensor.rToolsensortypeId.name}/>
                                        </div>
                                        <div className="parametr">
                                            <p className="title_parametrs">Record Point: </p>
                                            <input type="text" defaultValue={sensor.rToolsensortypeId.name}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="display-content-info-image">
                            <img src={img} width={"100px"} alt={"alter image description"}/>
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