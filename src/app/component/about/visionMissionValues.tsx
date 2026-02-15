"use client";

import { Lightbulb, Target, Heart } from "lucide-react";

export default function VisionMissionValues() {
  const items = [
    {
      icon: <Lightbulb className="w-12 h-12 text-red-500 mx-auto" />,
      title: "Our Vision",
      text: "Our vision is to merge the finest in Indian ethos and modern education practices in order to bring excellence in children and make them responsible citizens of the nation.",
    },
    {
      icon: <Target className="w-12 h-12 text-red-500 mx-auto" />,
      title: "Aims & Objectives",
      text: (
        <ul className="mt-3 list-disc list-inside text-gray-600 text-sm space-y-1 text-left">
          <li>Foster curiosity and creativity.</li>
          <li>Help students realize their true potential.</li>
          <li>Encourage expression and innovation.</li>
          <li>Build strong values and life skills.</li>
          <li>Prepare students for global opportunities.</li>
        </ul>
      ),
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500 mx-auto" />,
      title: "Our Values",
      text: "Our mission is to develop excellence in academics to focus on Physical, Cultural and Personality Development of a child for his/her holistic development.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Vision, Mission & Values</h2>
        <p className="text-center text-gray-500 mt-2">
          Principles that define who we are and what we stand for.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              {item.icon}
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <div className="mt-3 text-gray-600 text-sm">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
