//  eslint-disable-next-line 
export const modifyPayload = (values: any) => {
    const obj = { ...values };
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (value instanceof File || (Array.isArray(value) && value[0] instanceof File)) {
            const fileToUpload = Array.isArray(value) ? value[0] : value;
            formData.append("file", fileToUpload);
            delete obj[key];
        }
    });
    const data = JSON.stringify(obj);
    formData.append("data", data);

    return formData;
};