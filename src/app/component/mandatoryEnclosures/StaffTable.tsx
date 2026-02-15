export default function StaffInfo() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Staff (Teaching)
      </h2>

      {/* Outer Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        {/* Principal */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">Principal</span>
          <span className="text-gray-900 font-semibold">
            Mr. Bibhas Ranjan Pal, MA B.Ed.
          </span>
        </div>

        {/* Total Teachers */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            Total No. of Teachers
          </span>
          <span className="text-gray-900 font-semibold">114</span>
        </div>

        {/* Teacher Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-xl p-4 bg-gray-50">
          <div className="flex justify-start gap-x-6">
            <span className="text-gray-600">PGT</span>
            <span className="font-semibold">17</span>
          </div>
          <div className="flex justify-start gap-x-6">
            <span className="text-gray-600">TGT</span>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex justify-start gap-x-6">
            <span className="text-gray-600">PRT</span>
            <span className="font-semibold">39</span>
          </div>
          <div className="flex justify-start gap-x-6">
            <span className="text-gray-600">NTT</span>
            <span className="font-semibold">23</span>
          </div>
        </div>

        {/* Teacher Section Ratio */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            Teachers Section Ratio
          </span>
          <span className="text-gray-900 font-semibold">1.5</span>
        </div>

        {/* Special Educator */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">Special Educator</span>
          <span className="text-gray-900 font-semibold">
            Mrs. Manjushree Sharma
          </span>
        </div>

        {/* Counsellor */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            Counsellor & Wellness Teacher
          </span>
          <span className="text-gray-900 font-semibold">Mrs. Ratna Sharma</span>
        </div>
      </div>
    </div>
  );
}
