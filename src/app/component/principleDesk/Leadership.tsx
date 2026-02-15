'use client';
import { useState } from 'react';
import Image from 'next/image';

const profiles = [
  {
    role: "Principal",
    heading: "From the Principal's Desk",
    name: "Mr. BIBHAS RANJAN PAL",
    image: "/principal.jpg",
    content: `On behalf of Team Saket MGM Sr. Sec. School, I am happy to welcome you all to the 2024-25 school year! 
          I am honoured and privileged to lead the esteemed school as the Principal. 
          I sincerely express that I will ensure that the mind of the students are influenced with positive thought, 
          supported by the ambience of the school. It will establish a new wave of emotion and a kind of connection to 
          the world that will open up new horizons to our students and empower them to attain their goals.
          
          We in Saket MGM Sr. Sec School believe that education is a collaborative effort among Parents, Teachers and Students. 
          It is our priority to make each and every student attain success with active participation in all activities amounting 
          to holistic development. We offer students the best possible opportunities to become confident, thoughtful young learners 
          and get themselves prepared for meeting any future challenges in an exciting and increasingly globalised world.

          Education inculcated in the mind of the students make him/her recognize the power and beauty that lies within him/her. 
          Education does not merely mean academic excellence but also a harmonious and synchronized combination of hand, i.e. Skills 
          such as various arts, Head i.e. Intellectual Power, and Heart i.e. value system.

          In the present era of digital world, it is the biggest challenge before educators and Parents to nurture the young minds 
          with the indelible impressions of holistic education. I take the opportunity to thank all our stake holders, especially Parents 
          who have trusted us and supported the school. We ensure working in a team spirit on providing a safe, conducive and encouraging 
          school environment that will support the entire learning system.`
  },
  {
    role: "Chairman",
    heading: "From the Chairman's Desk",
    name: "Mr.Atul Shah",
    image: "https://res.cloudinary.com/drlidswcd/image/upload/Chairman-1660383831_josqzq.jpg",
    content: `We are a close knit community of parents, teachers and students working towards one goal, Education. When we mention education, it weaves a simple picture in our minds of a student learning and a teacher teaching, but education is beyond the classical pen-paper-black board theory. It has evolved into the giant wheel that has many spokes. The entire purpose of education is not to restrict itself to imparting bookish knowledge only but inculcate humanitarian values like wisdom, compassion, courage, humility, integrity and reliability in a student. Parents are the major contributors in our Endeavour. The light of education results in a promising and colorful future of the child. Teachers are trained not only to teach well but are also expected to inspire confidence and trust in their students and become role models. Further, the School inculcates in the students a respect for tradition and ensures discipline and good manners. The continuous effort to reinforce the commitment to achieve that extra mile helps students discover and reach their personal goals in life. We aim at ensuring that our comprehensive development programs provide students with an international learning experience, while preserving our core Indian values.`
  },
  {
    role: "Director",
    heading: "From the director's desk",
    name: "director",
    image: "https://res.cloudinary.com/drlidswcd/image/upload/v1754902608/Director-1643801753_ud36tu.png",
    content: `On behalf of the Management I would like to congratulate the staff, the students and all the others directly and indirectly associated with Saket MGM Sr. Sec. School and Saket Shishu Ranjan Hr. Sec. School for the successful completion of a glorious tenure of 35 years. At this juncture, I would like to acknowledge and extend my heartfelt gratitude to all those who have made significant contributions to turn these institutions started 35 years ago into one among the premier institutions of this city. 35 years in the life of an institution signifies the coming of age and maturity. Maturity, to objectively analyze its achievements and assess how much more needs to be done. As I glance back at the performance of the children in various activities during the previous years, be it curricular, co-curricular, I can confidently say that our students have certainly made us, parents and teachers proud of their achievements. We are aware of the challenges that lie ahead and will leave no stone unturned to further enrich the rich legacy of this esteemed institution. May the Almighty shower his blessings on all of us and give us the strength to face all the challenges that come in our way.`
  }
];

export default function Leadership() {
  const [selectedRole, setSelectedRole] = useState(profiles[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      {/* Role Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {profiles.map((profile) => (
          <button
            key={profile.role}
            onClick={() => setSelectedRole(profile)}
            className={`px-4 py-2 rounded-lg border ${
              selectedRole.role === profile.role 
                ? "bg-[#f82f53] text-white" 
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {profile.role}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Image
          src={selectedRole.image}
          alt={selectedRole.name}
          width={250}
          height={250}
          className="rounded-full object-cover aspect-square"
        />
        <div>
          <h2 className="text-2xl font-bold text-[#f82f53]">{selectedRole.heading}</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{selectedRole.content}</p>
          <p className="mt-4 text-lg font-semibold text-teal-500">{selectedRole.name}</p>
        </div>
      </div>
    </div>
  );
}
