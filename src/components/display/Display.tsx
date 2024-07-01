import React, { useState, useEffect } from "react";
import "./Display.css";
import useToolModuleQuery from "../../lib/hooks/tool_module.ts";
import { useParameterUpdate } from "../../lib/hooks/ToolModule/useParameterUpdate.ts";
import Cookies from 'js-cookie';
import Modal from "../Modal/Modal.tsx";
interface DisplayProps {
    selectedItemId: string | null;
    selectedUnitId: string;
}
interface Sensor {
    id: number; // или string, если идентификатор строковый
    rToolsensortypeId: {
        name: string;
    };
    recordPoint: string;
}

const Display: React.FC<DisplayProps> = ({ selectedItemId, selectedUnitId }) => {
    console.log("Параметры запроса", selectedItemId, selectedUnitId)
    const { loading, error, data } = useToolModuleQuery({ id: selectedItemId, unitSystem: selectedUnitId });
    const { updateParameter } = useParameterUpdate();
    const [parameters, setParameters] = useState<Record<string, string>>({});
    const hiddenParameters = ['Image h_y1', 'Image h_y2'];
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");

    useEffect(() => {
        if (data && data.parameterSet) {
            const initialParameters = data.parameterSet.reduce((acc: Record<string, string>, param: any) => {
                if (!hiddenParameters.includes(param.parameterType.parameterName)) {
                    acc[param.id] = Number(param.parameterValue).toFixed(2);
                }
                return acc;
            }, {});
            setParameters(initialParameters);
        }
    }, [data]);

    const handleParameterChange = (paramId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regex = /^\d*\.?\d*$/;

        if (regex.test(value)) {
            setParameters((prevParameters) => ({
                ...prevParameters,
                [paramId]: value,
            }));
        } else {
        }
    };
    const handleSave = async () => {
        if (selectedItemId && data && data.parameterSet) {
            const updatedParameters = Object.entries(parameters).reduce((acc, [paramId, value]) => {
                const originalParam = data.parameterSet.find((param: any) => param.id === paramId);
                if (originalParam && originalParam.parameterValue.toFixed(2) !== value) {
                    acc.push({ id: paramId, parameterValue: parseFloat(value) });
                }
                return acc;
            }, [] as { id: string; parameterValue: number }[]);

            if (updatedParameters.length > 0) {
                console.log("Updating parameters:", updatedParameters);
                try {
                    for (const param of updatedParameters) {
                        await updateParameter({
                            variables: {
                                input: {
                                    id: param.id,
                                    parameterValue: param.parameterValue
                                }
                            }
                        });
                    }
                    setShowModal(true);
                    setModalMessage("Update successful!");
                } catch (error) {
                    setShowModal(true);
                    setModalMessage("The entered values have the wrong data type, the data will not be saved.");
                }
            }
        }
    };

    if (loading) return console.log("Loading")
    if (error) return console.log("Error:" + error.message);


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

    if (loading) return console.log("Loading")
    if (error) return console.log("Error:" + error.message);

    const img = "data:image/png;base64," + data.image;
    const role = Cookies.get('role');

    const handleUndoChanges = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input: HTMLInputElement) => {
            input.value = input.defaultValue;
        });
    };

    const closeModal = () => {
        setShowModal(false);
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
                            <input type="text" defaultValue={data.sn} disabled={true}/>
                        </div>
                        <div className="title">
                            <div className="display-content-titles">
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Group: </h4>
                                    </div>
                                    <input type="text" defaultValue={data.rModuleType.rModulesGroup.name} disabled={true} />
                                </div>
                                <div className="title">
                                    <div className="heading-of-param">
                                        <h4 className="heading-of-param">Module Type: </h4>
                                    </div>
                                    <input type="text" defaultValue={data.rModuleType.name} disabled={true} />
                                </div>
                            </div>
                        </div>
                        <div className="title">
                            <div className="heading-of-param">
                                <h4 className="heading-of-param">Housing: </h4>
                            </div>
                            <input type="text" defaultValue={data.rModuleType.rModulesGroup.name + ":" + data.sn} disabled={true} />
                        </div>
                    </div>
                    <div className="display-content-info">
                        <div className="display-content-info-params">
                            <div className="params">
                                <h4>Housing Params</h4>
                                <div className="Housing_params-content">
                                    {data.parameterSet
                                        .filter((param: any) => !hiddenParameters.includes(param.parameterType.parameterName)) // фильтруем параметры, которые не должны быть скрыты
                                        .map((param) => (
                                            <div className="parametr" key={param.id}>
                                                <p className="title_parametrs">{param.parameterType.parameterName}</p>
                                                <input
                                                    className="num_parametrs"
                                                    value={parameters[param.id] || ""}
                                                    onChange={handleParameterChange(param.id)}
                                                    disabled={role === "user"}
                                                />
                                                <p className="unit_parametrs">{param.unit.name.en}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                        <div className="params">
                            <h4>Housing Sensors</h4>
                            <table className="Housing_params-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Record Point</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.toolinstalledsensorSet.map((sensor, index: number) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    defaultValue={sensor.rToolsensortype.name}
                                                    disabled={role == "user"}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    defaultValue={sensor.recordPoint}
                                                    disabled={role == "user"}
                                                />
                                                {sensor.unit.name.en}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>

                        <div className="display-content-info-image">
                            <img src={img} width={"100px"} alt={"alter image description"} />
                            <div className="info-image-buttons">
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
            {showModal && <Modal onClose={closeModal} message={modalMessage} />}
        </div>
    );
};

export default Display;
