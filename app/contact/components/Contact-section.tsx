import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="max-w-7xl   mx-auto px-4 py-20">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="max-w-[100%] flex justify-between flex-col md:flex-row items-start ">
          <div>
            <h2 className="text-blue-600 font-semibold mb-4">
              HOW CAN HELP YOU?
            </h2>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Have a project in mind?
              <br />
              Get in touch!
            </h1>
          </div>
          <p className="text-yale_blue-400 max-w-[60%]">
            We're here to help and answer any question you might have. We look
            forward to hearing from you. Any need help you please contact us or
            meet to office with coffee.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg text-blue-600 font-semibold">Email Us</h3>
            </div>
            <p className="text-yale_blue-400">
              Feel free to drop us a line for any inquiries.
            </p>
            <a
              href="mailto:hello@apexbart.com"
              className="text-blue-600 hover:underline"
            >
              hello@apexbart.com
            </a>
          </div>

          {/* Uzbekistan Office Card */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg text-blue-600 font-semibold">
                ApexBart Uzbekistan Office
              </h3>
            </div>
            <p className="text-yale_blue-400">
              123, Amir Temur Street<br />
              Tashkent, 100100, Uzbekistan
            </p>
            <a
              href="tel:+998712345678"
              className="text-blue-600 hover:underline"
            >
              +998 71 234 5678
            </a>
          </div>

          {/* Singapore Office Card */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg text-blue-600 font-semibold">
                ApexBart Singapore Office
              </h3>
            </div>
            <p className="text-yale_blue-400">
              456 Orchard Road,<br />
              #08-12, Singapore 238888
            </p>
            <a
              href="tel:+6561234567"
              className="text-blue-600 hover:underline"
            >
              +65 6123 4567
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
