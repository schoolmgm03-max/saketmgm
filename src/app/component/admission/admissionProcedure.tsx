import { CheckCircle } from "lucide-react";

export default function AdmissionProcedure() {
  const checklist = [
    "A transfer certificate from the school last attended.",
    "A birth certificate issued by a competent authority.",
    "Aadhaar card (student, parents).",
    "Child ID of student.",
    "Caste Certificate if any.",
    "Mark-sheet of previous session.",
    "Passport size photographs.",
    "Other related documents.",
  ];

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Admission Procedure
        </h2>
        <div className="w-20 h-1 bg-pink-500 mb-8"></div>

        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Admission is open to all subject to availability of seats. Admission
          for Classes I to XII is granted on the basis of an admission/entrance
          test. Submission of application does not guarantee admission. The
          decision of the School Selection Committee for admission is final.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Admission to the school is open to all irrespective of caste, creed,
          religion, or nationality. The minimum age for nursery class is 3
          years. Since our medium of instruction is English, preference is given
          to those having enough proficiency in English. Students from other
          schools/districts/states must produce the following documents:
        </p>

        {/* Checklist */}
        <div className="grid gap-6 sm:grid-cols-2">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="w-6 h-6 text-pink-500 mt-1" />
              <p className="text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
