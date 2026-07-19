'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Profile {
  role: string;
  heading: string;
  name: string;
  image: string;
  content: string;
}

export default function Leadership() {
  const [principalName, setPrincipalName] = useState("Dr. Ganesh Digamber Patil");
  const [selectedRoleType, setSelectedRoleType] = useState("Principal");

  useEffect(() => {
    const fetchPrincipalName = async () => {
      try {
        const res = await fetch("/api/admin/mandatoryDisclosure");
        if (res.ok) {
          const data = await res.json();
          const principalInfo = data.schoolInfo?.find((info: { id: number; value: string }) => info.id === 5);
          if (principalInfo?.value) {
            // Split by comma to extract the name part
            const namePart = principalInfo.value.split(",")[0].trim();
            // Convert to nice case or keep standard format
            let formattedName = namePart;
            if (formattedName.toUpperCase().startsWith("MR. ")) {
              formattedName = "Mr. " + formattedName.substring(4);
            } else if (formattedName.toUpperCase().startsWith("MRS. ")) {
              formattedName = "Mrs. " + formattedName.substring(5);
            } else if (formattedName.toUpperCase().startsWith("MS. ")) {
              formattedName = "Ms. " + formattedName.substring(4);
            } else if (formattedName.toUpperCase().startsWith("DR. ")) {
              formattedName = "Dr. " + formattedName.substring(4);
            }
            setPrincipalName(formattedName);
          }
        }
      } catch (err) {
        console.error("Failed to fetch principal name:", err);
      }
    };
    fetchPrincipalName();
  }, []);

  const profiles: Profile[] = [
    {
      role: "Principal",
      heading: "From the Principal's Desk",
      name: principalName,
      image: "/principal_img.jpeg",
      content: `It is a matter of great pleasure for us to share kaleidoscopic view of our school activities through our website.At Saket MGM Sr. Secondary School, we meticulously plan our pedagogical activities keeping in view the 360° development (1.Q,E.Q, S.Q,A.Q, F.Q) of our students. We endeavour to empower and upskill each of our students through innovative activities and events to become responsible citizens of this country and the world, fully aware of future challenges and ready to tackle them. Self-awareness, social awareness, environmental awareness, and a deep respect for our great Indian heritage, ethos, and values form the very foundation of our vision & systems. We at Saket MGM Sr. Sec. School believe that education is a collaborative effort among parents, teachers, and students. We believe that each student has a unique strength and the potential to make a positive impact on the surrounding world. Harward Gardner's theory of Multiple intelligence provides framework for the modus operandi of our pedagogies and learning objectives. Our mission is to help every child discover and develop the best within each of them, and develop it to its optimum level. Sports- and arts-integrated, competency-based experiential pedagogies make learning a genuine joy at Saket MGM Sr. Sec. School to achieve this objective. I am sure that this website will play a vital role to bridge the information gap between students, community and school contributing to the cause of excellence in education through our collaborative and synergistic effort. We deeply appreciate your cooperation, support, and encouragement in our pursuit to shape empowered, skilled, responsible citizens of fast changing world —individuals who are empowered with the latest technological know-how and guided by human values, 21st-century skills, knowledge, and information. We look forward to your continued love and support for this great institution through your active involvement in future also.

We wish you all a learning-filled years of momentous achievements and milestones as Saket MGM Sr Sec.School members`
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

  const selectedRole = profiles.find(p => p.role === selectedRoleType) || profiles[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      {/* Role Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {profiles.map((profile) => (
          <button
            key={profile.role}
            onClick={() => setSelectedRoleType(profile.role)}
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
          <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">{selectedRole.content}</p>
          <p className="mt-4 text-lg font-semibold text-teal-500">{selectedRole.name}</p>
        </div>
      </div>
    </div>
  );
}
