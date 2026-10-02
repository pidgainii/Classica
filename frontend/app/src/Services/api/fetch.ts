import api from "./api";
import z from "zod";
import type { Response } from "../../Models/result";

export const getMethod = async (
  url: string,
  expected_schema: z.ZodObject | z.ZodArray,
): Promise<Response> => {
  try {
    const { data: result } = await api.get(url);

    const zodResult = expected_schema.safeParse(result);

    if (!zodResult.success) {
      const response: Response = {
        success: false,
        message: "Data parsing error",
      };
      return response;
    }

    const response: Response = { success: true, data: zodResult.data };
    return response;
  } catch (error: any) {
    const result: Response = { success: false, message: "API request error" };
    return result;
  }
};

export const postMethod = async (
  url: string,
  expected_schema?: z.ZodObject | z.ZodArray,
  data?: any,
): Promise<Response> => {
  try {
    const { data: result } = await api.post(url, data);

    if (expected_schema) {
      const zodResult = expected_schema.safeParse(result);
      if (!zodResult.success) {
        const response: Response = {
          success: false,
          message: "Data parsing error",
        };
        return response;
      }

      const response: Response = { success: true, data: zodResult.data };
      return response;
    }

    const response: Response = { success: true };
    return response;
  } catch {
    const result: Response = { success: false, message: "API request error" };
    return result;
  }
};
