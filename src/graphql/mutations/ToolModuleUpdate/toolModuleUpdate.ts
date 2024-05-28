import { gql } from "@apollo/client";

export const TOOLMODULE_UPDATE = gql`
  mutation UpdateToolModule($id: UUID!, $sn: String, $dbtlength: Float) {
    updateToolModule(input: { id: $id, sn: $sn, dbtlength: $dbtlength }) {
      toolModule {
        id
        sn
        dbtlength
      }
    }
  }
`;
