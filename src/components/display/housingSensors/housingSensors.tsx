import React from "react";

interface HousingSensorsProps {
    sensors: any[];
    role: string | undefined;
}

const HousingSensors: React.FC<HousingSensorsProps> = ({ sensors, role }) => (
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
                {sensors.map((sensor, index) => (
                    <tr key={index}>
                        <td>
                            <input type="text" defaultValue={sensor.rToolsensortype.name} disabled={role === "user"} />
                        </td>
                        <td>
                            <input type="text" defaultValue={sensor.recordPoint} disabled={role === "user"} />
                            {sensor.unit.name.en}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default HousingSensors;
