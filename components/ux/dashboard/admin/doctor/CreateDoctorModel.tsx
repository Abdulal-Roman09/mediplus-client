import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { post } from "@/services/api/api";
import Modal from "@/components/ux/Model/Modal";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { modifyPayload } from "@/utils/modifyPayload";
import { useQueryClient } from "@tanstack/react-query";
import FormInput from "@/components/ux/FromProvider/FromInput";
import FormSelect from "@/components/ux/FromProvider/FromSelect";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import { CreateDoctorModalPropos } from "@/types/doctorCreationProps";
import FormFileUploader from "@/components/ux/FromProvider/FromFileuploader";
import { doctorValidationSchema } from "@/Validation/Admin/createDoctorSchema";

type FormData = z.infer<typeof doctorValidationSchema>;

export default function CreateDoctorModal({
  open,
  onOpenChange,
}: CreateDoctorModalPropos) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitDoctor = async (values: FormData) => {
    setIsLoading(true);
    try {
      const payload = modifyPayload(values);
      await post("/user/create-doctor", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Doctor created successfully.");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.message || "Failed to create Doctor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Create New Doctor">
      <FormHendeler
        onSubmit={onSubmitDoctor}
        resolver={zodResolver(doctorValidationSchema)}
        defaultValues={{
          password: "",
          profilePhoto: undefined,
          doctor: {
            name: "",
            email: "",
            contactNumber: "",
            address: "",
            registrationNumber: "",
            experience: 0,
            gender: "MALE",
            appointmentFee: 0,
            qualification: "",
            currentWorkingPlace: "",
            designation: "",
          },
        }}
      >
        <div className="space-y-6 max-h-[65vh] overflow-y-auto">
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="doctor.name"
                label="Full Name"
                placeholder="Full name"
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
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ]}
              />
            </div>
            <div className="mt-6">
              <FormFileUploader
                name="profilePhoto"
                label="Upload Doctor Picture"
              />
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Contact & Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="doctor.contactNumber"
                label="Contact Number"
                placeholder="+880"
                required
              />
              <FormInput
                name="doctor.address"
                label="Address"
                placeholder="Full address"
                required
              />
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="doctor.qualification"
                label="Qualification"
                placeholder="MBBS, FCPS"
                required
              />
              <FormInput
                name="doctor.designation"
                label="Designation"
                placeholder="Consultant"
                required
              />
              <FormInput
                name="doctor.experience"
                label="Experience"
                type="number"
                required
              />
              <FormInput
                name="doctor.registrationNumber"
                label="Reg Number"
                placeholder="12345"
                required
              />
              <FormInput
                name="doctor.currentWorkingPlace"
                label="Working Place"
                placeholder="Hospital Name"
                required
              />
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Appointment Fee
            </h3>
            <FormInput
              name="doctor.appointmentFee"
              label="Fee"
              type="number"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Creating..."
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Create Doctor
              </>
            )}
          </Button>
        </div>
      </FormHendeler>
    </Modal>
  );
}
