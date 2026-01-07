"use client";

import Modal from "@/components/modules/Model/Modal";
import { get } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Reusable Info Item with Icon
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-base text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [isProfilePhotoOpen, setIsProfilePhotoOpen] = useState(false);

  // Fetch current user
  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => get("/user/me"),
  });

  const userId = userData?.data?.id;

  // Fetch admin profile
  const { data: adminData } = useQuery({
    queryKey: ["adminProfile", userId],
    queryFn: async () => get(`/admin/${userId}`),
    enabled: !!userId,
  });

  const admin = adminData?.data;

  if (!admin) return null;
  //   only photo update
  //   patch(`/admin/${userId}`);

  return (
    <div className=" p-8  bg-card rounded-2xl shadow-lg">
      {/* Header: Photo + Name */}
      <div className="flex items-center gap-8 mb-10">
        <Modal
          open={isProfilePhotoOpen}
          onOpenChange={setIsProfilePhotoOpen}
          title="Profile Photo"
          trigger={
            <div className="relative group">
              <Image
                src={admin.profilePhoto}
                alt={admin.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-border object-cover cursor-pointer "
              />
            </div>
          }
        >
          <div className="flex flex-col items-center gap-6">
            <Image
              src={admin.profilePhoto}
              alt={admin.name}
              width={300}
              height={300}
              className="rounded-2xl object-cover "
            />
            {/* ai icons clike korle akta modal open hobe oi khaen file ta sen dkorbo */}
            <Button size={"lg"}>
              <Camera className="w-5 h-5" />
              Change Photo
            </Button>
          </div>
        </Modal>

        <div>
          <h1 className="text-3xl font-bold text-foreground">{admin.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{admin.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{admin.contactNumber}</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <User className="w-7 h-7 " />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-6 rounded-xl">
          <InfoItem icon={User} label="Full Name" value={admin.name} />
          <InfoItem icon={Mail} label="Email Address" value={admin.email} />
          <InfoItem
            icon={Phone}
            label="Contact Number"
            value={admin.contactNumber}
          />
          <InfoItem
            icon={ShieldCheck}
            label="Account Status"
            value={admin.isDeleted ? "Inactive" : "Active"}
          />
        </div>
      </div>

      {/* Account Information */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-primary" />
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl">
          <InfoItem
            icon={Calendar}
            label="Created At"
            value={new Date(admin.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <InfoItem
            icon={Clock}
            label="Last Updated"
            value={new Date(admin.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </div>
      </div>
    </div>
  );
}
