export const modifyPayload = (values: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    return formData;
};