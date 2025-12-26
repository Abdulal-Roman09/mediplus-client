"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Modal from "@/components/ux/Model/Modal";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import FormInput from "@/components/ux/FromProvider/FromInput";
import FormFileUploader from "@/components/ux/FromProvider/FromFileuploader";

const specialtySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  icon: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof specialtySchema>;

export default function SpecialtiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Specialty Created:", data);
    setIsModalOpen(false);
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

              {/* Icon Upload (Optional) */}
              <div className="grid gap-2">
                <Label>Icon / Picture (Optional)</Label>
                <FormFileUploader
                  name="icon"
                  size="lg"
                  label="Upload Icon"
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
