import { gql } from '@apollo/client';

export default gql`
    query ToolModule($id: String!) {
        toolModulesById(id: $id) {
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
                recordPoint
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
