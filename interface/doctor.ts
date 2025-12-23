export interface Doctor {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: "MALE" | "FEMALE";
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    doctorSpecialties: [doctorSpecialties];
}

 export interface DoctorsApiResponse {
    success: boolean;
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
    };
    data: Doctor[];
}
 export interface doctorSpecialties {
    specialtysId: string;
    doctorId: string;
    specialities: {
        id: string;
        title: string;
        icon: string;
    };
}