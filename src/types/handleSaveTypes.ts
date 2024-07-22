import { Parameter, Sensor } from "src/types/interfaces.ts";

export interface SaveParams {
    selectedItemId: string | null;
    data: {
        parameterSet: Parameter[];
        toolinstalledsensorSet: Sensor[];
    };
    parameters: Record<string, string>;
    sensorRecordPoints: Record<string, string>;
    invalidParameters: Record<string, boolean>;
    updateParameter: (args: { variables: { input: { id: string; parameterValue: number } } }) => Promise<void>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalMessage: React.Dispatch<React.SetStateAction<string>>;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}
