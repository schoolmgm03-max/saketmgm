// components/Achievements.tsx

import {
  Star,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

const achievements = [
  {
    icon: <Star className="text-[#f82f53] w-10 h-10 mb-4" />,
    title: "Academic Excellence",
    description:
      "Consistently achieving top results in board exams and competitive entrance tests.",
  },
  {
    icon: <ShieldCheck className="text-[#f82f53] w-10 h-10 mb-4" />,
    title: "Holistic Development",
    description:
      "Recognized for sports, arts, leadership and co-curricular excellence.",
  },
  {
    icon: <Lightbulb className="text-[#f82f53] w-10 h-10 mb-4" />,
    title: "Innovation in Education",
    description:
      "Using modern teaching methods and tech to enhance learning outcomes.",
  },
];

const Achievements = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Our Achievements
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Recognizing our journey of continuous growth and excellence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center flex flex-col items-center"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
