import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { post } from "@/services/api/api";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ux/Model/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { modifyPayload } from "@/utils/modifyPayload";
import { useQueryClient } from "@tanstack/react-query";
import FormInput from "@/components/ux/FromProvider/FromInput";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import { specialtySchema } from "@/Validation/Admin/specialtySchema";
import { CreateSpecialtyModalProps } from "@/types/adminSpecialtiesProps";
import FormFileUploader from "@/components/ux/FromProvider/FromFileuploader";

type FormData = z.infer<typeof specialtySchema>;

export function CreateSpecialtyModal({
  open,
  onOpenChange,
}: CreateSpecialtyModalProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      const payload = modifyPayload(values);
      await post("/specialties", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Specialty created successfully.");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.message || "Failed to create specialty.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Create New Specialty">
      <FormHendeler
        onSubmit={onSubmit}
        resolver={zodResolver(specialtySchema)}
        defaultValues={{ title: "", file: undefined }}
      >
        <div className="space-y-4 py-4">
          <FormInput
            name="title"
            label="Title"
            placeholder="e.g. Cardiology"
            required
          />
          <FormFileUploader
            className="w-full"
            name="file"
            label="Upload Specialty Icon"
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Confirm Create"}
            </Button>
          </div>
        </div>
      </FormHendeler>
    </Modal>
  );
}
