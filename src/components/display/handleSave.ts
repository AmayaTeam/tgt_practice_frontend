import { SaveParams } from "src/types/handleSaveTypes";
import { Parameter, Sensor } from "src/types/interfaces.ts";

const hasInvalidInputs = (invalidParameters: Record<string, boolean>): boolean => {
    return Object.values(invalidParameters).some(isInvalid => isInvalid);
};

const getUpdatedParameters = (parameters: Record<string, string>, parameterSet: Parameter[]): { id: string; parameterValue: number }[] => {
    return Object.entries(parameters).reduce((acc, [paramId, value]) => {
        const originalParam = parameterSet.find(param => param.id === paramId);
        if (originalParam && originalParam.parameterValue.toFixed(2) !== value) {
            acc.push({ id: paramId, parameterValue: parseFloat(value) });
        }
        return acc;
    }, [] as { id: string; parameterValue: number }[]);
};

const getUpdatedSensors = (sensorRecordPoints: Record<string, string>, sensorSet: Sensor[]): { id: string; recordPoint: string }[] => {
    return Object.entries(sensorRecordPoints).reduce((acc, [sensorId, value]) => {
        const originalSensor = sensorSet.find(sensor => sensor.id === sensorId);
        if (originalSensor && originalSensor.recordPoint !== value) {
            acc.push({ id: sensorId, recordPoint: value });
        }
        return acc;
    }, [] as { id: string; recordPoint: string }[]);
};

const saveUpdatedParameters = async (updatedParameters: { id: string; parameterValue: number }[], updateParameter: (args: { variables: { input: { id: string; parameterValue: number } } }) => Promise<void>): Promise<void> => {
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
};

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
}: SaveParams): Promise<void> => {
    if (hasInvalidInputs(invalidParameters)) {
        setShowModal(true);
        setModalMessage("The entered values have the wrong data type, the data will not be saved.");
        return;
    }

    if (selectedItemId && data && data.parameterSet) {
        const updatedParameters = getUpdatedParameters(parameters, data.parameterSet);
        const updatedSensors = getUpdatedSensors(sensorRecordPoints, data.toolinstalledsensorSet);

        if (updatedParameters.length > 0 || updatedSensors.length > 0) {
            console.log("Обновление параметров:", updatedParameters);
            console.log("Обновление сенсоров:", updatedSensors);
            try {
                await saveUpdatedParameters(updatedParameters, updateParameter);
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
