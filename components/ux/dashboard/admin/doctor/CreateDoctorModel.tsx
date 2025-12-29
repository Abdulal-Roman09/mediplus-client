import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ux/Model/Modal";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import FormInput from "@/components/ux/FromProvider/FromInput";
import FormSelect from "@/components/ux/FromProvider/FromSelect";
import FormFileUploader from "@/components/ux/FromProvider/FromFileuploader";

export default function CreateDoctorModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const onSubmitDoctor = async (data: any) => {
    setIsLoading(true);
    try {
      console.log("Submitting doctor data:", data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating doctor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Create New Doctor">
      <FormHendeler
        onSubmit={onSubmitDoctor}
        defaultValues={{
          password: "",
          doctor: {
            name: "",
            email: "",
            contactNumber: "",
            address: "",
            registrationNumber: "",
            experience: "",
            gender: "",
            appointmentFee: "",
            qualification: "",
            currentWorkingPlace: "",
            designation: "",
            profilePhoto: "",
          },
        }}
      >
        <div className="space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Section 1: Personal Information */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="doctor.name"
                label="Full Name"
                placeholder="Enter doctor's full name"
                required
              />
              <FormInput
                name="doctor.email"
                label="Email"
                type="email"
                placeholder="doctor@example.com"
                required
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                required
              />
              <FormSelect
                name="doctor.gender"
                label="Gender"
                required
                placeholder="Please select your gender"
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ]}
              />
            </div>
            <div className="mt-4">
              <FormFileUploader
                name="profilePhoto"
                label="Upload Doctor Picture"
                placeholder="Click to upload photo"
              />
            </div>
          </div>

          {/* Section 2: Contact & Address */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Contact & Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="doctor.contactNumber"
                label="Contact Number"
                placeholder="+880 1XXX-XXXXXX"
                required
              />
              <FormInput
                name="doctor.address"
                label="Address"
                placeholder="Enter full address"
                required
              />
            </div>
          </div>

          {/* Section 3: Professional Information */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="doctor.qualification"
                label="Qualification"
                placeholder="e.g., MBBS, FCPS"
                required
              />
              <FormInput
                name="doctor.designation"
                label="Designation"
                placeholder="e.g., Consultant, Professor"
                required
              />
              <FormInput
                name="doctor.experience"
                label="Years of Experience"
                type="number"
                placeholder="e.g., 10"
                required
              />
              <FormInput
                name="doctor.registrationNumber"
                label="RegistrationNumber"
                placeholder="Enter your RegistrationNumber"
                type="number"
                required
              />
              <FormInput
                name="doctor.currentWorkingPlace"
                label="Current Working Place"
                placeholder="e.g., Dhaka Medical College"
                required
              />
            </div>
          </div>

          {/* Section 4: Appointment Fee Information */}
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Appointment Fee Information
            </h3>
            <FormInput
              name="doctor.appointmentFee"
              label="Appointment Fee"
              placeholder="Enter appointment fee amount"
              required
              type="number"
              className="w-full"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Creating..."
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Doctor
              </>
            )}
          </Button>
        </div>
      </FormHendeler>
    </Modal>
  );
}
