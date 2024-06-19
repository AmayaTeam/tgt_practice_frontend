import { gql } from '@apollo/client';

export default gql`
    query ToolModule($id: String!) {
        toolModulesById(id: $id) {
            id
            sn
            dbsn
            dbtname
            image
            rModuleType {
              name
              rModulesGroup {
                name
              }
            }
            toolinstalledsensorSet {
              rToolsensortype {
                id
                name
              }
              recordPoint
              unit {
                name {
                  en
                }
              }
            }
            parameterSet {
              id
              parameterType {
                parameterName
              }
              parameterValue
              unit {
                name {
                  en
                }
              }
            }
        }
    }
`;
