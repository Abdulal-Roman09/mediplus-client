"use client";

import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ux/Model/Modal";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import FormInput from "@/components/ux/FromProvider/FromInput";
import FormFileUploader from "@/components/ux/FromProvider/FromFileuploader";
import { modifyPayload } from "@/utils/modifyPayload";
import { post } from "@/services/api/api";
import { toast } from "sonner";

const specialtySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  file: z
    .any()
    .refine((file) => file instanceof File, "Please upload a valid file"),
});

type FormData = z.infer<typeof specialtySchema>;

export default function SpecialtiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    const data = modifyPayload(values);
    try {
      await post("/specialties", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Specialty created successfully.", {
        position: "top-center",
      });
      setIsModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create specialty. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
      });
      console.log(errorMessage);
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        {/* Create Specialty Modal */}
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          trigger={<Button size="lg">Create Specialties</Button>}
          title="Create New Specialty"
        >
          <FormHendeler
            onSubmit={onSubmit}
            resolver={zodResolver(specialtySchema)}
            defaultValues={{
              title: "",
            }}
          >
            <div className="space-y-6">
              {/* Specialty Title */}
              <FormInput
                name="title"
                label="Specialty Title"
                placeholder="e.g., Cardiology, Neurology"
                required
              />

              {/* file Upload (Optional) */}
              <div className="grid gap-2">
                <Label>File / Picture (Optional)</Label>
                <FormFileUploader
                  name="file"
                  label="Upload file"
                  className="max-w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Specialty</Button>
              </div>
            </div>
          </FormHendeler>
        </Modal>

        {/* Search Bar */}
        <div className="w-full sm:w-96 relative">
          <Input
            placeholder="Search specialties..."
            className="pl-10 pr-4 h-11"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
        </div>
      </div>

      {/* Specialties List Placeholder */}
      <div className="mt-8 text-center text-muted-foreground py-16 border-2 border-dashed rounded-xl">
        Specialties list will appear here...
      </div>
    </div>
  );
}
