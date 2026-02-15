"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const text = "Welcome to Saket MGM";
const msg = `We are a close knit community of parents, teachers and students working towards one goal, Education. When we mention education, it weaves a simple picture in our minds of a student learning and a teacher teaching, but education is beyond the classical pen-paper-black board theory. It has evolved into the giant wheel that has many spokes. The entire purpose of education is not to restrict itself to imparting bookish knowledge only but inculcate humanitarian values like wisdom, compassion, courage, humility, integrity and reliability in a student. Parents are the major contributors in our Endeavour. The light of education results in a promising and colorful future of the child. Teachers are trained not only to teach well but are also expected to inspire confidence and trust in their students and become role models. Further, the School inculcates in the students a respect for tradition and ensures discipline and good manners. The continuous effort to reinforce the commitment to achieve that extra mile helps students discover and reach their personal goals in life. We aim at ensuring that our comprehensive development programs provide students with an international learning experience, while preserving our core Indian values.`;

const PrincipalMessage = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" }); // triggers when in viewport
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const charAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.01 },
    }),
  };

  return (
    <section ref={ref} className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Typewriter Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-900"
          initial="hidden"
          animate={controls}
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} custom={index} variants={charAnimation}>
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <p className="text-center text-gray-500 text-lg mt-2 mb-10">
           message from our Chairman Desk
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Principal Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 relative rounded-full overflow-hidden ">
              <Image
                src="https://res.cloudinary.com/drlidswcd/image/upload/v1754900707/Chairman-1660383831_josqzq.jpg"
                alt="Mr.Atul Shah"
                fill
                priority
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1 md:max-w-3xl lg:max-w-4xl">
            <h3 className="text-2xl font-semibold text-[#f82f53] mb-4">
               Welcome from Our  Chairman
            </h3>

            {/* Typewriter paragraph */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              {msg.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={charAnimation}
                >
                  {char}
                </motion.span>
              ))}
            </p>

            <p className="text-[#f82f53] font-semibold text-lg mb-4">
              Mr.Atul Shah
            </p>

            <button
              className="bg-[#f82f53] text-white font-semibold py-2 px-6 rounded-md transition hover:bg-[#e72749] cursor-pointer"
              onClick={() => router.push("/principal")}
            >
              Read Chairman&apos;s Full Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
