import { connectDB } from "@/lib/mongodb";
import MandatoryDisclosure from "@/models/MandatoryDisclosure";
import { NextResponse } from "next/server";

const defaultDisclosure = {
  schoolInfo: [
    { id: 1, label: "NAME OF THE SCHOOL", value: "SAKET MGM SENIOR SECONDARY SCHOOL" },
    { id: 2, label: "AFFILIATION NO. (IF APPLICABLE)", value: "1030477" },
    { id: 3, label: "SCHOOL CODE (IF APPLICABLE)", value: "50498" },
    { id: 4, label: "COMPLETE ADDRESS WITH PIN CODE", value: "LALDHAU, PURANPURA, VIDISHA, MADHYA PRADESH - 464001" },
    { id: 5, label: "PRINCIPAL NAME & QUALIFICATION", value: "DR. GANESH DIGAMBER PATIL" },
    { id: 6, label: "SCHOOL EMAIL ID", value: "saketmgm@gmail.com" },
    { id: 7, label: "CONTACT DETAILS (LANDLINE/MOBILE)", value: "07592-297036 / 8349929343" },
  ],
  documents: [
    { id: 1, title: "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY", file: "https://drive.google.com/file/d/1FRquZmJLGK3nkm-KJPgwALEqqOUB2lnA/view?usp=drive_link" },
    { id: 2, title: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE", file: "https://drive.google.com/file/d/1knRVTzrIiYrtO9FvSGyLkFPnf8vl2tQc/view?usp=drive_link" },
    { id: 3, title: "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT", file: "https://drive.google.com/file/d/1DPW_Bpsf502NtozUpdedvcUltNtaOcdy/view?usp=sharing" },
    { id: 4, title: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT'S RENEWAL IF APPLICABLE", file: "https://drive.google.com/file/d/1c9sSSds7Z2_eBpCJLtJJDMQ6nMKkHmWn/view?usp=sharing" },
    { id: 5, title: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE", file: "https://drive.google.com/file/d/1JXQnTjqjxd58-U1aKxzwyBwdIyCfcehN/view?usp=sharing" },
    { id: 6, title: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY", file: "https://drive.google.com/file/d/1ifnjbXZPCVAdg43dLYbKEjU5ZGGLIq73/view?usp=drive_link" },
    { id: 7, title: "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL", file: "https://drive.google.com/file/d/1Uab9-vAEcD9iImKQmcQTLzl26EPb09FU/view?usp=drive_link" },
    { id: 8, title: "COPIES OF VALID DRINKING WATER, HEALTH AND SANITATION CERTIFICATES AND WATER TESTING REPORT", file: "https://drive.google.com/file/d/1badXuJYJTIjBeCK_Dm_6fyCyjmrTGJLj/view?usp=drive_link" },
    { id: 9, title: "LAND CERTIFICATE (ADDITIONAL COMPLIANCE)", file: "https://drive.google.com/file/d/19UQbnDIMgVGmGbLrB4NIlI51Jzoaha3Z/view?usp=sharing" }
  ],
  academicDocs: [
    { id: 1, title: "FEE STRUCTURE OF THE SCHOOL", file: "/pdfs/fees.pdf" },
    { id: 2, title: "ANNUAL ACADEMIC CALENDAR", file: "/pdfs/anual.pdf" },
    { id: 3, title: "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", file: "/pdfs/SCHOOL-MANAGEMENT-COMMITTEE-(SMC)-1736592835.pdf" },
    { id: 4, title: "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", file: "/pdfs/LIST-OF-PARENTS--TEACHERS-ASSOCIATION-(PTA)-MEMBERS--1721800189.pdf" },
    { id: 5, title: "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION (AS PER APPLICABILITY)", file: "/pdfs/consolidated-Result-of-AISSE-AISSCE-Examination--1686540272.pdf" },
    { id: 6, title: "BOOK LIST", file: "#" }
  ],
  staffDetails: [
    { id: 1, label: "PRINCIPAL", value: "DR. GANESH DIGAMBER PATIL" },
    { id: 2, label: "VICE PRINCIPAL", value: "0" },
    { id: 3, label: "HEADMISTRESS/HEADMASTER", value: "0" },
    { id: 4, label: "TOTAL NO. OF TEACHERS", value: "114", isList: true },
    { id: 5, label: "TEACHERS SECTION RATIO", value: "1.5" },
    { id: 6, label: "DETAILS OF SPECIAL EDUCATOR", value: "MRS. MANJUSHREE SHARMA" },
    { id: 7, label: "DETAILS OF COUNSELLOR & WELLNESS TEACHER", value: "MRS. RATNA SHARMA" }
  ],
  infrastructureDetails: [
    { id: 1, label: "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQR MTR)", value: "16720 SQ. METERS" },
    { id: 2, label: "NO. AND SIZE OF THE CLASSROOMS (IN SQR MTR)", value: "95 Classrooms (Size: 48 Sq. Meters each)" },
    { id: 3, label: "NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQR MTR)", value: "6 Laboratories", isLabs: true },
    { id: 4, label: "NO. AND SIZE OF LIBRARY (IN SQR MTR)", value: "1 Library (Size: 120 Sq. Meters)" },
    { id: 5, label: "INTERNET FACILITY (YES/NO)", value: "YES" },
    { id: 6, label: "NO. OF GIRLS TOILETS", value: "28" },
    { id: 7, label: "NO. OF BOYS TOILETS", value: "28" },
    { id: 8, label: "NO. OF CWSN TOILETS (TOILETS FOR DIFFERENTLY ABLED)", value: "4 (2 for Girls, 2 for Boys)" },
    { id: 9, label: "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL", value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", isYoutube: true }
  ],
  staffPgtCount: "17",
  staffTgtCount: "24",
  staffPrtCount: "39",
  staffNttCount: "34",
  staffListFile: "#",
  labs: [
    { name: "Physics Lab", size: "56 Sq. Meters" },
    { name: "Biology Lab", size: "63.05 Sq. Meters" },
    { name: "Chemistry Lab", size: "72.76 Sq. Meters" },
    { name: "Composite Science Lab", size: "56 Sq. Meters" },
    { name: "Computer Lab", size: "56 Sq. Meters" },
    { name: "Maths Lab", size: "46 Sq. Meters" },
  ]
};

export async function GET() {
  try {
    await connectDB();
    let data = await MandatoryDisclosure.findOne({});
    if (!data) {
      // Seed with initial values if empty
      data = await MandatoryDisclosure.create(defaultDisclosure);
    } else {
      // Handle forward-migration of missing subcount fields if db was populated before schema extension
      let updated = false;
      if (data.staffPgtCount === undefined) { data.staffPgtCount = "17"; updated = true; }
      if (data.staffTgtCount === undefined) { data.staffTgtCount = "24"; updated = true; }
      if (data.staffPrtCount === undefined) { data.staffPrtCount = "39"; updated = true; }
      if (data.staffNttCount === undefined) { data.staffNttCount = "34"; updated = true; }
      if (data.staffListFile === undefined) { data.staffListFile = "#"; updated = true; }
      if (!data.labs || data.labs.length === 0) {
        data.labs = defaultDisclosure.labs;
        data.markModified("labs"); // Mongoose needs this for array mutations on existing docs
        updated = true;
      }
      if (updated) {
        data.markModified("staffPgtCount");
        data.markModified("staffTgtCount");
        data.markModified("staffPrtCount");
        data.markModified("staffNttCount");
        data.markModified("staffListFile");
        await data.save();
      }
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET MandatoryDisclosure Error:", err);
    return NextResponse.json({ error: "Failed to fetch disclosure data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    let disclosure = await MandatoryDisclosure.findOne({});
    if (disclosure) {
      // Update existing
      disclosure.schoolInfo = data.schoolInfo || disclosure.schoolInfo;
      disclosure.documents = data.documents || disclosure.documents;
      disclosure.academicDocs = data.academicDocs || disclosure.academicDocs;
      disclosure.staffDetails = data.staffDetails || disclosure.staffDetails;
      disclosure.infrastructureDetails = data.infrastructureDetails || disclosure.infrastructureDetails;
      disclosure.staffPgtCount = data.staffPgtCount !== undefined ? data.staffPgtCount : disclosure.staffPgtCount;
      disclosure.staffTgtCount = data.staffTgtCount !== undefined ? data.staffTgtCount : disclosure.staffTgtCount;
      disclosure.staffPrtCount = data.staffPrtCount !== undefined ? data.staffPrtCount : disclosure.staffPrtCount;
      disclosure.staffNttCount = data.staffNttCount !== undefined ? data.staffNttCount : disclosure.staffNttCount;
      disclosure.staffListFile = data.staffListFile !== undefined ? data.staffListFile : disclosure.staffListFile;
      disclosure.labs = data.labs || disclosure.labs;
      disclosure.updatedAt = new Date();
      await disclosure.save();
    } else {
      // Create new
      disclosure = await MandatoryDisclosure.create({
        ...defaultDisclosure,
        ...data,
      });
    }

    return NextResponse.json({ message: "Disclosure data saved successfully", data: disclosure }, { status: 200 });
  } catch (err) {
    console.error("POST MandatoryDisclosure Error:", err);
    return NextResponse.json({ error: "Failed to save disclosure data" }, { status: 500 });
  }
}
