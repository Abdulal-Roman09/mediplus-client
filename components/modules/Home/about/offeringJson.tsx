import {
  Video,
  ShieldCheck,
  Users,
  Clock,
  Stethoscope,
  FileText,
  Calendar,
  MessageSquare,
} from "lucide-react";

export const offerings = [
  {
    icon: <Stethoscope className="h-12 w-12" />,
    title: "Expert Doctors",
    description:
      "Access verified specialists across various medical fields, ensuring you receive the highest quality care and accurate diagnoses.",
    color: "text-blue-500",
  },
  {
    icon: <Video className="h-12 w-12" />,
    title: "Video Consultation",
    description:
      "Experience high-definition live video calls for real-time medical advice. Consult with top doctors from your home.",
    color: "text-emerald-500",
  },
  {
    icon: <ShieldCheck className="h-12 w-12" />,
    title: "Data Security",
    description:
      "Your personal and medical information is our top priority. We use advanced encryption to ensure your data is fully protected.",
    color: "text-amber-500",
  },
  {
    icon: <Users className="h-12 w-12" />,
    title: "User-Friendly",
    description:
      "Our platform is designed with simplicity in mind. Navigate effortlessly through appointments and records on any device.",
    color: "text-purple-500",
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "Easy Scheduling",
    description:
      "Book, reschedule, or manage your medical appointments with just a few clicks. Stay organized with automated reminders.",
    color: "text-rose-500",
  },
  {
    icon: <Clock className="h-12 w-12" />,
    title: "24/7 Availability",
    description:
      "Healthcare doesn't stop. Access medical support and consult with doctors any time, day or night, including holidays.",
    color: "text-cyan-500",
  },
  {
    icon: <FileText className="h-12 w-12" />,
    title: "Digital Prescription",
    description:
      "Receive e-prescriptions directly within the app immediately after your consultation for quick medicine fulfillment.",
    color: "text-orange-500",
  },
  {
    icon: <MessageSquare className="h-12 w-12" />,
    title: "Secure Chat",
    description:
      "Quickly follow up with your doctor or ask medical queries through our encrypted chat system for continuous support.",
    color: "text-indigo-500",
  },
];
