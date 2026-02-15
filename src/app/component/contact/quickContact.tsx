import { MessageCircle, Phone, Mail } from "lucide-react";

export default function QuickConnect() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-4xl  mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Quick Connect Options
        </h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* WhatsApp */}
          <a
            href="https://wa.me/917592281897" // Change to your number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600 transition"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>

          {/* Call */}
          <a
            href="tel:+9107592232026 " // Change to your number
            className="flex items-center justify-center gap-2 border border-gray-300 text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>

          {/* Email */}
          <a
            href="mailto:saketmgm@gmail.com" // Change to your email
            className="flex items-center justify-center gap-2 border border-gray-300 text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
