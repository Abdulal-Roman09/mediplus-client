"use client";

import { useState } from "react";
import CreateDoctorModel from "./CreateDoctorModel";
import DoctorPageHader from "./DoctorPageHader";

export default function DoctorPage() {
  const [isOpenModel, setIsOpenModel] = useState(false);

  return (
    <div className="p-6">
        <DoctorPageHader onOpenModal={setIsOpenModel} />

      {/* Model */}
      <CreateDoctorModel open={isOpenModel} onOpenChange={setIsOpenModel} />
    </div>
  );
}
