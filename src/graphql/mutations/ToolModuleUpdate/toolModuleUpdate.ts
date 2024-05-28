import { gql } from "@apollo/client";

export const TOOLMODULE_UPDATE = gql`
  mutation UpdateToolModule(
    $id: UUID!,
    $sn: String,
    $dbtlength: Float,
    $dbtweight: Float,
    $dbtmaxOd: Float,
    $dbtmaxOdOpened: Float,
    $dbtmaxOdCollapsed: Float,
    $dbtcompStr: Float
  ) {
    updateToolModule(input: {
      id: $id,
      sn: $sn,
      dbtlength: $dbtlength,
      dbtweight: $dbtweight,
      dbtmaxOd: $dbtmaxOd,
      dbtmaxOdOpened: $dbtmaxOdOpened,
      dbtmaxOdCollapsed: $dbtmaxOdCollapsed,
      dbtcompStr: $dbtcompStr
    }) {
      toolModule {
        id
        sn
        dbtlength
        dbtweight
        dbtmaxOd
        dbtmaxOdOpened
        dbtmaxOdCollapsed
        dbtcompStr
      }
    }
  }
`;
