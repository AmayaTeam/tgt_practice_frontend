import { useMutation } from "@apollo/client";
import { SN_UPDATE } from "../../../graphql/mutations/ToolModuleUpdate/snUpdate";

export const useSnUpdate = () => {
    const [snUpdate, { data, loading, error }] = useMutation(SN_UPDATE, {
        onError: (err) => {
            console.error("Mutation error:", err);
        }
    });

    return {
        snUpdate,
        data,
        loading,
        error,
    };
};
