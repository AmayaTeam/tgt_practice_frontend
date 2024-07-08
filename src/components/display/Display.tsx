import React, { useState, useEffect } from "react";
import "./Display.css";
import useToolModuleQuery from "../../lib/hooks/tool_module.ts";
import { useParameterUpdate } from "../../lib/hooks/ToolModule/useParameterUpdate.ts";
import Cookies from 'js-cookie';
import Modal from "../Modal/Modal.tsx";
import HousingParams from "./displayComponents/housingParams.tsx";
import DisplayHeader from "./displayComponents/displayHeader.tsx";
import HousingSensors from "./displayComponents/housingSensors.tsx";
import ImageSection from "./displayComponents/imageSection.tsx";
import ControlButtons from "./displayComponents/controlButtons.tsx";


interface DisplayProps {
    selectedItemId: string | null;
    selectedUnitId: string;
}


const Display: React.FC<DisplayProps> = ({ selectedItemId, selectedUnitId }) => {
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

    if (loading) return <div>Loading...</div>;

    if (error) {
        console.log(error);
        return <div>Internal error occurred</div>;;
    }

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
                    <DisplayHeader
                        sn={data.sn}
                        groupName={data.rModuleType.rModulesGroup.name}
                        moduleName={data.rModuleType.name}
                        housing={`${data.rModuleType.rModulesGroup.name}:${data.sn}`}
                    />

                    <div className="display-content-info">
                        <div className="display-content-info-params">
                            <HousingParams
                                parameters={parameters}
                                parameterSet={data.parameterSet}
                                hiddenParameters={hiddenParameters}
                                handleParameterChange={handleParameterChange}
                                role={role}
                            />

                            <HousingSensors
                                sensors={data.toolinstalledsensorSet}
                                role={role}
                            />
                        </div>

                        <ImageSection
                            img={img}
                            sn={data.sn}
                        />
                    </div>

                    <ControlButtons
                        handleSave={handleSave}
                        handleUndoChanges={handleUndoChanges}
                        role={role}
                    />
                </div>
            </div>
            {showModal && <Modal onClose={closeModal} message={modalMessage} />}
        </div >
    );
};

export default Display;
