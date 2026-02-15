export default function SchoolInfrastructure() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        School Infrastructure
      </h2>

      {/* Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        {/* Campus Area */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            Total Campus Area of the School (in Sq. Mtr)
          </span>
          <span className="text-gray-900 font-semibold">16720</span>
        </div>

        {/* Classrooms */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            No. and Size of the Class Rooms (in Sq. Mtr)
          </span>
          <span className="text-gray-900 font-semibold">
            95 (Size - 48 Sq. Meters)
          </span>
        </div>

        {/* Laboratories */}
        <div>
  <span className="font-medium text-gray-600 block mb-2">
    No. and Size of Laboratories (Including Computer Labs in Sq. Mtr)
  </span>

  <div className="bg-gray-50 rounded-xl p-4 text-gray-800 text-sm">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2">
      <span>Physics Lab</span>
      <span className="font-medium">56 Sq. Meters</span>

      <span>Biology Lab</span>
      <span className="font-medium">63.05 Sq. Meters</span>

      <span>Chemistry Lab</span>
      <span className="font-medium">72.76 Sq. Meters</span>

      <span>Composite Science Lab</span>
      <span className="font-medium">56 Sq. Meters</span>

      <span>Computer Lab</span>
      <span className="font-medium">56 Sq. Meters</span>

      <span>Maths Lab</span>
      <span className="font-medium">46 Sq. Meters</span>
    </div>
  </div>
</div>


        {/* Internet Facility */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">Internet Facility</span>
          <span className="text-gray-900 font-semibold">Yes</span>
        </div>

        {/* Girls Toilets */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            No. of Girls Toilets
          </span>
          <span className="text-gray-900 font-semibold">28</span>
        </div>

        {/* Boys Toilets */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">No. of Boys Toilets</span>
          <span className="text-gray-900 font-semibold">28</span>
        </div>

        {/* Youtube Link */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">
            Link of YouTube Video of the Inspection of School Covering
            Infrastructure
          </span>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Inspection of School
          </a>
        </div>

        {/* Teacher List Download */}
        <div className="flex flex-col sm:flex-row justify-between">
          <span className="font-medium text-gray-600">Upload Teacher List</span>
          <a
            href="#"
            className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
