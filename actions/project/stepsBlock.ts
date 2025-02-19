import { useMutationData } from "@/hooks/useMutation";
import axios from "axios";

axios.defaults.withCredentials = true; // Global axios config to enable cookies
const source = (process.env.NEXT_PUBLIC_BASE_URL as string) + "/codeblock";

const StepsBlockAction = {
  useadd: () => {
    const OptimisticFn = (previousData: any, variables: any) => {
      return {
        ...previousData,
        payload: [...previousData.payload].map((item: any) => {
          if (item._id === variables._id) {
            return {
              ...item,
              steps: [
                ...item.steps,
                { name: "Loading... " + item.steps.length + 1 },
              ],
            };
          }
          return item;
        }),
      };
    };

    const { mutate } = useMutationData(
      ["CodeBlockAction.addstep"],
      async (payload: any) => {
        const response = await axios.post(`${source}/step/new`, payload);
        return response.data;
      },
      ["CodeBlockAction.getCodeBlock"],
      OptimisticFn
    );
    return { mutate };
  },

  useduplicate: () => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.duplicateStep"],
      async (payload: any) => {
        const response = await axios.post(`${source}/step/duplicate`, payload);
        return response.data;
      },
      ["CodeBlockAction.getCodeBlock"]
    );
    return { mutate };
  },

  usedelete: () => {
    const { mutate } = useMutationData(
      ["CodeBlockAction.deleteStep"],
      async (payload: any) => {
        const response = await axios.post(`${source}/step/delete`, payload);
        return response.data;
      },
      ["CodeBlockAction.getCodeBlock"]
    );
    return { mutate };
  },
};

export default StepsBlockAction;
