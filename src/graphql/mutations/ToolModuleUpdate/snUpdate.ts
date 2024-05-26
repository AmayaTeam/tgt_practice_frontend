import { gql } from "@apollo/client";

export const SN_UPDATE = gql`
  mutation UpdateToolModule($id: UUID!, $sn: String!) {
    updateToolModule(input: { id: $id, sn: $sn }) {
      toolModule {
        id
        sn
      }
    }
  }
`;
