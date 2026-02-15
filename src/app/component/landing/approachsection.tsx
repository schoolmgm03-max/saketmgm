import { BookOpen, NotebookPen } from "lucide-react";

const ApproachSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Academics at Saket MGM
        </h2>
        <p className="text-lg text-gray-500">
          Fostering intellectual curiosity and academic rigor
        </p>

        <div className="mt-12 bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <NotebookPen className="w-16 h-16 text-[#f82f53]" />
          <div className="text-left flex-1">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Approach to Learning
            </h3>
            <p className="text-gray-700 text-base">
              At Saket MGM, our academic philosophy is rooted in a holistic approach that balances rigorous intellectual development with character building. We offer a comprehensive curriculum designed to meet national standards while fostering critical thinking, creativity, and problem-solving skills. Our dedicated faculty employs innovative teaching methodologies, ensuring every student receives personalized attention and thrives in a supportive learning environment. We are committed to preparing students not just for examinations, but for for life.
            </p>
          </div>
          <BookOpen className="w-16 h-16 text-[#f82f53]" />
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
