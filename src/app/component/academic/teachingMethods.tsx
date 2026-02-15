"use client";

import { Lightbulb, Users, Brain, FlaskConical, Palette, Music } from "lucide-react";

export default function TeachingMethods() {
  const methods = [
    {
      icon: <Lightbulb className="w-10 h-10 text-red-400" />,
      title: "Inquiry-Based Learning",
      desc: "Students explore questions, concepts, and issues, fostering critical thinking and problem-solving skills through active investigation."
    },
    {
      icon: <Users className="w-10 h-10 text-red-400" />,
      title: "Collaborative Projects",
      desc: "Encouraging teamwork and communication, students work together on interdisciplinary projects that simulate real-world scenarios."
    },
    {
      icon: <Brain className="w-10 h-10 text-red-400" />,
      title: "Personalized Education",
      desc: "Tailoring learning experiences to individual student needs and paces, supported by adaptive technology and mentorship."
    },
    {
      icon: <FlaskConical className="w-10 h-10 text-red-400" />,
      title: "Experiential Learning",
      desc: "Learning through doing, with hands-on experiments, field trips, and practical applications that bring concepts to life."
    },
    {
      icon: <Palette className="w-10 h-10 text-red-400" />,
      title: "Creative Arts Integration",
      desc: "Incorporating art, music, and drama across the curriculum to enhance understanding and expression in all subjects."
    },
    {
      icon: <Music className="w-10 h-10 text-red-400" />,
      title: "Digital Fluency",
      desc: "Equipping students with essential digital literacy skills, integrating technology tools for research, creation, and presentation."
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Our Innovative Teaching Methodologies
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{method.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-600 text-sm">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
