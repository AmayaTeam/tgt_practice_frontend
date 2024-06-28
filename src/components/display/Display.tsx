import React, { useState, useEffect } from "react";
import "./Display.css";
import useToolModuleQuery from "../../lib/hooks/tool_module.ts";
import { useToolModuleUpdate } from "../../lib/hooks/ToolModuleUpdate/useToolModuleUpdate.ts";
import Cookies from 'js-cookie';
/* import Modal from "../modal/Modal.tsx";
 */
interface DisplayProps {
    selectedItemId: string | null;
}

const Display: React.FC<DisplayProps> = ({ selectedItemId }) => {
    const { loading, error, data } = useToolModuleQuery(selectedItemId);
    const { updateToolModule } = useToolModuleUpdate();
    const [sn, setSn] = useState<string>("");
    const [dbtlength, setDbtlength] = useState<string>("");
    const [dbtweight, setDbtweight] = useState<string>("");
    const [dbtmaxOd, setDbtmaxOd] = useState<string>("");
    const [dbtmaxOdOpened, setDbtmaxOdOpened] = useState<string>("");
    const [dbtmaxOdCollapsed, setDbtmaxOdCollapsed] = useState<string>("");
    const [dbtcompStr, setDbtcompStr] = useState<string>("");

    const [initialSn, setInitialSn] = useState<string>("");
    const [initialDbtlength, setInitialDbtlength] = useState<string>("");
    const [initialDbtweight, setInitialDbtweight] = useState<string>("");
    const [initialDbtmaxOd, setInitialDbtmaxOd] = useState<string>("");
    const [initialDbtmaxOdOpened, setInitialDbtmaxOdOpened] = useState<string>("");
    const [initialDbtmaxOdCollapsed, setInitialDbtmaxOdCollapsed] = useState<string>("");
    const [initialDbtcompStr, setInitialDbtcompStr] = useState<string>("");

    const [dbtlengthValid, setDbtlengthValid] = useState<boolean>(true);
    const [dbtweightValid, setDbtweightValid] = useState<boolean>(true);
    const [dbtmaxOdValid, setDbtmaxOdValid] = useState<boolean>(true);
    const [dbtmaxOdOpenedValid, setDbtmaxOdOpenedValid] = useState<boolean>(true);
    const [dbtmaxOdCollapsedValid, setDbtmaxOdCollapsedValid] = useState<boolean>(true);
    const [dbtcompStrValid, setDbtcompStrValid] = useState<boolean>(true);


    const [errors, setErrors] = useState<{
        dbtlength: boolean,
        dbtweight: boolean,
        dbtmaxOd: boolean,
        dbtmaxOdOpened: boolean,
        dbtmaxOdCollapsed: boolean,
        dbtcompStr: boolean
    }>({
        dbtlength: false,
        dbtweight: false,
        dbtmaxOd: false,
        dbtmaxOdOpened: false,
        dbtmaxOdCollapsed: false,
        dbtcompStr: false
    });

    const role = Cookies.get('role');

    useEffect(() => {
        if (data) {
            setSn(data.sn || "");
            setDbtlength(data.dbtlength !== undefined ? data.dbtlength.toString() : "");
            setDbtweight(data.dbtweight !== undefined ? data.dbtweight.toString() : "");
            setDbtmaxOd(data.dbtmaxOd !== undefined ? data.dbtmaxOd.toString() : "");
            setDbtmaxOdOpened(data.dbtmaxOdOpened !== undefined ? data.dbtmaxOdOpened.toString() : "");
            setDbtmaxOdCollapsed(data.dbtmaxOdCollapsed !== undefined ? data.dbtmaxOdCollapsed.toString() : "");
            setDbtcompStr(data.dbtcompStr !== undefined ? data.dbtcompStr.toString() : "");

            setInitialSn(data.sn || "");
            setInitialDbtlength(data.dbtlength !== undefined ? data.dbtlength.toString() : "");
            setInitialDbtweight(data.dbtweight !== undefined ? data.dbtweight.toString() : "");
            setInitialDbtmaxOd(data.dbtmaxOd !== undefined ? data.dbtmaxOd.toString() : "");
            setInitialDbtmaxOdOpened(data.dbtmaxOdOpened !== undefined ? data.dbtmaxOdOpened.toString() : "");
            setInitialDbtmaxOdCollapsed(data.dbtmaxOdCollapsed !== undefined ? data.dbtmaxOdCollapsed.toString() : "");
            setInitialDbtcompStr(data.dbtcompStr !== undefined ? data.dbtcompStr.toString() : "");
        }
    }, [data]);



    const handleInputChange = (
        field: keyof typeof errors, 
        setter: React.Dispatch<React.SetStateAction<string>>, 
        setValid: React.Dispatch<React.SetStateAction<boolean>>
      ) => (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
          setter(value);
          setErrors(prev => ({ ...prev, [field]: false }));
          setValid(true);
        } else {
          setter(value); // Update the value even if it's invalid to show the feedback
          setErrors(prev => ({ ...prev, [field]: true }));
          setValid(false);
        }
      };
      


    const handleSnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSn(event.target.value);
    };

/*     const handleDbtlengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbtlength(event.target.value);
    };

    const handleDbtweightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbtweight(event.target.value);
    };

    const handleDbtmaxOdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbtmaxOd(event.target.value);
    };

    const handleDbtmaxOdOpenedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbtmaxOdOpened(event.target.value);
    };

    const handleDbtmaxOdCollapsedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbtmaxOdCollapsed(event.target.value);
    };

    const handleDbtcompStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbtcompStr(event.target.value);
    }; */

    const handleSave = async () => {
        if (selectedItemId) {
            const variables: {
                id: string,
                sn?: string,
                dbtlength?: number,
                dbtweight?: number,
                dbtmaxOd?: number,
                dbtmaxOdOpened?: number,
                dbtmaxOdCollapsed?: number,
                dbtcompStr?: number
            } = { id: selectedItemId };

            if (sn !== initialSn) {
                variables.sn = sn;
            }
            if (dbtlength !== initialDbtlength) {
                variables.dbtlength = parseFloat(dbtlength);
            }
            if (dbtweight !== initialDbtweight) {
                variables.dbtweight = parseFloat(dbtweight);
            }
            if (dbtmaxOd !== initialDbtmaxOd) {
                variables.dbtmaxOd = parseFloat(dbtmaxOd);
            }
            if (dbtmaxOdOpened !== initialDbtmaxOdOpened) {
                variables.dbtmaxOdOpened = parseFloat(dbtmaxOdOpened);
            }
            if (dbtmaxOdCollapsed !== initialDbtmaxOdCollapsed) {
                variables.dbtmaxOdCollapsed = parseFloat(dbtmaxOdCollapsed);
            }
            if (dbtcompStr !== initialDbtcompStr) {
                variables.dbtcompStr = parseFloat(dbtcompStr);
            }

            console.log("Sending update request with variables:", variables);
            try {
                await updateToolModule({ variables });
                alert('Update successful');
                setInitialSn(sn);
                setInitialDbtlength(dbtlength);
                setInitialDbtweight(dbtweight);
                setInitialDbtmaxOd(dbtmaxOd);
                setInitialDbtmaxOdOpened(dbtmaxOdOpened);
                setInitialDbtmaxOdCollapsed(dbtmaxOdCollapsed);
                setInitialDbtcompStr(dbtcompStr);
            } catch (error) {
                console.error("Error updating:", error);
            }
        }
    };


    /* const handleInfoExport = () => {

        const sensors = data.toolinstalledsensorSet.map(item => ({
            name: item.rToolsensortypeId.name,
            recordPoint: item.recordPoint
          }));

        const toolModuleData = {
            sn: data.sn,
            group: data.rModuleTypeId.rModulesGroupId.name,
            module_type: data.rModuleTypeId.name,
            housing: data.rModuleTypeId.rModulesGroupId.name + ":" + data.sn,
            length: Number(data.dbtlength).toFixed(2),
            weight: Number(data.dbtweight).toFixed(2),
            COMP_STR: Number(data.dbtcompStr).toFixed(2),
            OD: Number(data.dbtmaxOd).toFixed(2),
            OD_Closed: Number(data.dbtmaxOdCollapsed).toFixed(2),
            OD_Opened: Number(data.dbtmaxOdOpened).toFixed(2),
            housing_sensors: sensors
        };

        const fileData = JSON.stringify(toolModuleData);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = data.sn + ".json";
        link.href = url;
        link.click();
    }; */

    const handleImageExport = async () => {
        if (img !== undefined) {
            const imgBlob = await fetch(img).then(res => res.blob());
            const imgUrl = URL.createObjectURL(imgBlob);
            const link = document.createElement('a');
            link.href = imgUrl;
            link.download = data.sn + '.png';
            link.click();
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    const img = "data:image/png;base64," + data.image;

    // need to fix, not working
    const handleUndoChanges = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input: HTMLInputElement) => {
            input.value = input.defaultValue;
        });
    };
    
    

    return (
        <div className="display-container">
            <div className="display">
                <div className="display-content">
                    <div className="display-content-title">
                        <div className="title">
                            <div className="heading-of-param">
                                <h4 className="heading-of-param">SN :</h4>
                            </div>
                            <input type="text" defaultValue={data.sn} onChange={handleSnChange} disabled={true} />
                        </div>
                        <div className="title">
                            <div className="display-content-titles">
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Group: </h4>
                                    </div>
                                    <input type="text" defaultValue={data.rModuleTypeId.rModulesGroupId.name} disabled={true} />
                                </div>
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Module Type: </h4>
                                    </div>
                                    <input type="text" defaultValue={data.rModuleTypeId.name} disabled={true} />
                                </div>
                            </div>
                        </div>
                        <div className="title">
                            <div className="heading-of-param">
                                <h4 className="heading-of-param">Housing: </h4>
                            </div>
                            <input type="text" defaultValue={data.rModuleTypeId.rModulesGroupId.name + ":" + data.sn} disabled={true} />
                        </div>
                    </div>
                    <div className="display-content-info">
                        <div className="display-content-info-params">
                            <div className="params">
                                <h4>Housing Params</h4>
                                <div className="Housing_params-content">

                                <div className="parametr">
                                        <p className="title_parametrs">Length* :</p>
                                        <input className={`num_parametrs ${dbtlengthValid ? '' : 'invalid'}`} 
                                            value={dbtlength} 
                                            onChange={handleInputChange('dbtlength', setDbtlength, setDbtlengthValid)} 
                                            disabled={role === "user"} 
                                            />
                                        <p className="unit_parametrs">mm</p>
                                    </div>

                                    <div className="parametr">
                                        <p className="title_parametrs">Weight :</p>
                                        <input className={`num_parametrs ${dbtweightValid ? '' : 'invalid'}`} 
                                            value={dbtweight} 
                                            onChange={handleInputChange('dbtweight', setDbtweight, setDbtweightValid)} 
                                            disabled={role === "user"} 
                                            />
                                        <p className="unit_parametrs">kg</p>
                                    </div>

                                    <div className="parametr">
                                        <p className="title_parametrs">COMP STR :</p>
                                        <input className={`num_parametrs ${dbtcompStrValid ? '' : 'invalid'}`} 
                                            value={dbtcompStr} 
                                            onChange={handleInputChange('dbtcompStr', setDbtcompStr, setDbtcompStrValid)} 
                                            disabled={role === "user"} 
                                            />
                                        <p className="unit_parametrs">kg</p>
                                    </div>

                                    <div className="parametr">
                                        <p className="title_parametrs">OD* :</p>
                                        <input className={`num_parametrs ${dbtmaxOdValid ? '' : 'invalid'}`} 
                                            value={dbtmaxOd} 
                                            onChange={handleInputChange('dbtmaxOd', setDbtmaxOd, setDbtmaxOdValid)} 
                                            disabled={role === "user"} 
                                            />
                                        <p className="unit_parametrs">mm</p>
                                    </div>

                                    <div className="parametr">
                                        <p className="title_parametrs">OD Closed :</p>
                                        <input className={`num_parametrs ${dbtmaxOdCollapsedValid ? '' : 'invalid'}`} 
                                            value={dbtmaxOdCollapsed} 
                                            onChange={handleInputChange('dbtmaxOdCollapsed', setDbtmaxOdCollapsed, setDbtmaxOdCollapsedValid)} 
                                            disabled={role === "user"} 
                                            />
                                        <p className="unit_parametrs">mm</p>
                                    </div>

                                    <div className="parametr">
                                        <p className="title_parametrs">OD Opened :</p>
                                        <input className={`num_parametrs ${dbtmaxOdOpenedValid ? '' : 'invalid'}`} 
                                            value={dbtmaxOdOpened} 
                                            onChange={handleInputChange('dbtmaxOdOpened', setDbtmaxOdOpened, setDbtmaxOdOpenedValid)} 
                                            disabled={role === "user"} 
                                            />
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
                                            <input type="text" defaultValue={sensor.rToolsensortypeId.name}
                                                   disabled={role == "user"}/>
                                        </div>
                                        <div className="parametr">
                                            <p className="title_parametrs">Record Point: </p>
                                            <input type="text" defaultValue={sensor.recordPoint}
                                                   disabled={role == "user"}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="display-content-info-image">
                            <img src={img} width={"100px"} alt={"alter image description"}/>
                            <div className="info-image-buttons">
{/*                                 <button onClick={handleInfoExport}>Export Info</button>*/}                                
                                <button onClick={handleImageExport}>Export Image</button>
                                <button>Import Image</button>
                            </div>
                        </div>
                    </div>
                    {role == 'manager' ? (
                        <div className="display-content-buttons">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleUndoChanges}>Undo Changes</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Display;