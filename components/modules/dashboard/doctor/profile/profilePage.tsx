"use client";

import { get } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";

export default function DoctorProfilePage() {
  // Step 1: Fetch current logged-in user
  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await get("/user/me");
      return res;
    },
  });

  const userId = userData?.data?.id;

  // Step 2: Fetch doctor-specific data only when userId is available
  const {
    data: doctorData,
    isLoading: isLoadingDoctor,
    isError: isDoctorError,
  } = useQuery({
    queryKey: ["doctorProfile", userId],
    queryFn: async () => {
      const res = await get(`/doctor/${userId}`);
      return res;
    },
    enabled: !!userId,
  });

  // Loading states
  if (isLoadingUser || isLoadingDoctor) return <div>Loading...</div>;
  if (isUserError || isDoctorError) return <div>Error loading data</div>;

  const doctor = doctorData?.data;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctor Profile</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Update Profile
        </button>
      </div>

      {/* Profile Photo */}
      <div className="flex items-center mb-6">
        <img
          src={doctor.profilePhoto}
          alt={doctor.name}
          className="w-24 h-24 rounded-full mr-4 border border-gray-300"
        />
        <div>
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-500">{doctor.email}</p>
          <p className="text-gray-500">{doctor.contactNumber}</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Gender</p>
            <p className="font-medium">{doctor.gender}</p>
          </div>
          <div>
            <p className="text-gray-500">Address</p>
            <p className="font-medium">{doctor.address}</p>
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Professional Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Qualification</p>
            <p className="font-medium">{doctor.qualification}</p>
          </div>
          <div>
            <p className="text-gray-500">Designation</p>
            <p className="font-medium">{doctor.designation}</p>
          </div>
          <div>
            <p className="text-gray-500">Registration No</p>
            <p className="font-medium">{doctor.registrationNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Experience</p>
            <p className="font-medium">{doctor.experience} years</p>
          </div>
          <div>
            <p className="text-gray-500">Current Workplace</p>
            <p className="font-medium">{doctor.currentWorkingPlace}</p>
          </div>
          <div>
            <p className="text-gray-500">Appointment Fee</p>
            <p className="font-medium">{doctor.appointmentFee} BDT</p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Account Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Created At</p>
            <p className="font-medium">{new Date(doctor.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Updated At</p>
            <p className="font-medium">{new Date(doctor.updatedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Deleted</p>
            <p className="font-medium">{doctor.isDeleted ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
