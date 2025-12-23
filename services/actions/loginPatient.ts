"use server";
interface LoginSchema {
    email: string,
    password: string
}

export const patientLogin = async (data: LoginSchema) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    const patientInfo = await res.json();

    return patientInfo
};