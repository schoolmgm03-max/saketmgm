"use client";

import { FileDown, ClipboardList, FileText, CheckCircle, DollarSign, School } from "lucide-react";

export default function AdmissionProcess() {
  const steps = [
    {
      icon: <FileDown className="w-10 h-10 text-pink-500" />,
      title: "Inquire & Apply",
      description:
        "Begin by submitting an online inquiry form and completing the application with all required details.",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-pink-500" />,
      title: "Entrance Test & Interview",
      description:
        "Prospective students will undergo an entrance examination followed by a personal interview.",
    },
    {
      icon: <FileText className="w-10 h-10 text-pink-500" />,
      title: "Document Submission",
      description:
        "Submit all necessary academic and personal documents as per the checklist provided.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-pink-500" />,
      title: "Admission Confirmation",
      description:
        "Upon successful evaluation, receive your admission offer and complete the enrollment process.",
    },
    {
      icon: <DollarSign className="w-10 h-10 text-pink-500" />,
      title: "Fee Payment",
      description:
        "Finalize your admission by paying the stipulated fees as per the school's fee structure.",
    },
    {
      icon: <School className="w-10 h-10 text-pink-500" />,
      title: "Orientation Program",
      description:
        "Attend the new student orientation to get acquainted with the school environment and faculty.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Admission Process</h2>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {step.icon}
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
