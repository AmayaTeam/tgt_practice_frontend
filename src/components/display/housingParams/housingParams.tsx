import React from "react";

interface HousingParamsProps {
    parameters: Record<string, string>;
    parameterSet: any[];
    hiddenParameters: string[];
    handleParameterChange: (paramId: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    role: string | undefined;
}

const HousingParams: React.FC<HousingParamsProps> = ({ parameters, parameterSet, hiddenParameters, handleParameterChange, role }) => (
    <div className="params">
        <h4>Housing Params</h4>
        <div className="Housing_params-content">
            {parameterSet
                .filter((param) => !hiddenParameters.includes(param.parameterType.parameterName))
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
);

export default HousingParams;
