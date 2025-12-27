import axiosInstance from "@/halpers/axiosIntance";


// GET
export const get = async <T>(url: string, params?: object): Promise<T> => {
    const response = await axiosInstance.get(url, { params });
    return response.data;
};

// POST
export const post = async <T, D = unknown>(
    url: string,
    data: D,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config:any
): Promise<T> => {
    const response = await axiosInstance.post(url, data,config);
    return response.data;
};

// UPDATE (PATCH)
export const patch = async <T, D = unknown>(
    url: string,
    data: D
): Promise<T> => {
    const response = await axiosInstance.patch(url, data);
    return response.data;
};

// DELETE
export const del = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete(url);
    return response.data;
};
