import { gql } from '@apollo/client';

export default gql`
    query ToolModule {
        toolModulesById(id: "3b74c9b4-fb05-4526-a460-f56f7d65f5f0") {
            sn
            dbsn
            dbtname
            rModuleTypeId {
                name
                rModulesGroupId {
                    name
                }
            }
            toolinstalledsensorSet {
                rToolsensortypeId {
                    id
                    name
                }
            }
            dbtlength
            dbtweight
            dbtmaxOd
            dbtmaxOdOpened
            dbtmaxOdCollapsed
            dbtcompStr
            image
        }
    }
`;
