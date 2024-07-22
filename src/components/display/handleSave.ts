// src/utils/handleSave.ts
import { Parameter, Sensor } from "src/types/interfaces.ts";

interface SaveParams {
    selectedItemId: string | null;
    data: any;
    parameters: Record<string, string>;
    sensorRecordPoints: Record<string, string>;
    invalidParameters: Record<string, boolean>;
    updateParameter: (args: any) => Promise<void>; // pass the function as an argument
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalMessage: React.Dispatch<React.SetStateAction<string>>;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleSave = async ({
    selectedItemId,
    data,
    parameters,
    sensorRecordPoints,
    invalidParameters,
    updateParameter,
    setShowModal,
    setModalMessage,
    setHasUnsavedChanges,
}: SaveParams) => {
    const hasInvalidInputs = Object.values(invalidParameters).some((isInvalid) => isInvalid);

    if (hasInvalidInputs) {
        setShowModal(true);
        setModalMessage("The entered values have the wrong data type, the data will not be saved.");
        return;
    }

    if (selectedItemId && data && data.parameterSet) {
        const updatedParameters = Object.entries(parameters).reduce((acc, [paramId, value]) => {
            const originalParam = data.parameterSet.find((param: Parameter) => param.id === paramId);
            if (originalParam && originalParam.parameterValue.toFixed(2) !== value) {
                acc.push({ id: paramId, parameterValue: parseFloat(value) });
            }
            return acc;
        }, [] as { id: string; parameterValue: number }[]);

        const updatedSensors = Object.entries(sensorRecordPoints).reduce((acc, [sensorId, value]) => {
            const originalSensor = data.toolinstalledsensorSet.find((sensor: Sensor) => sensor.id === sensorId);
            if (originalSensor && originalSensor.recordPoint !== value) {
                acc.push({ id: sensorId, recordPoint: value });
            }
            return acc;
        }, [] as { id: string; recordPoint: string }[]);

        if (updatedParameters.length > 0 || updatedSensors.length > 0) {
            console.log("Обновление параметров:", updatedParameters);
            console.log("Обновление сенсоров:", updatedSensors);
            try {
                for (const param of updatedParameters) {
                    await updateParameter({
                        variables: {
                            input: {
                                id: param.id,
                                parameterValue: param.parameterValue,
                            },
                        },
                    });
                }
                setShowModal(true);
                setModalMessage("The update was successful!");
                setHasUnsavedChanges(false);
            } catch (error) {
                setShowModal(true);
                setModalMessage("An error occurred while saving the data.");
            }
        }
    }
};

export default handleSave;
