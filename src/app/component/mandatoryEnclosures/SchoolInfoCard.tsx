const schoolInfo = [
  { label: "Name of the School", value: "Saket MGM Senior Secondary School Vidisha MP" },
  { label: "Affiliation No.", value: "1030477" },
  { label: "School Code", value: "50498" },
  { label: "Address", value: "Laldhau, Puranpura, Vidisha, Madhya Pradesh, 464001" },
  { label: "Principal Name & Qualification", value: "Mr. Bibhas Ranjan Pal, MA B.Ed." },
  { label: "School Email ID", value: "saketmgm@gmail.com" },
  { label: "Contact Details", value: "07592-297 036 / 8349929343" },
];

export default function SchoolInfoCard() {
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Mandatory Enclosures{" "}
          <span className="text-[#f82f53]">2025 - 2026</span>
        </h2>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-[#f82f53] mb-6">
            General Information
          </h3>

          <div className="grid gap-6">
            {schoolInfo.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between border-b pb-4 last:border-b-0"
              >
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="text-gray-900 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
