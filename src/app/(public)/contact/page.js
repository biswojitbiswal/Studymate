export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pt-28 space-y-6">

      <div>
        <h1 className="text-xl font-semibold">Contact Support</h1>
        <p className="text-sm text-gray-500">
          Have an issue or feedback? We’re here to help.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="bg-white border rounded-xl p-4 space-y-2 text-sm">
        <p><span className="font-medium">Email:</span> support@studynest.com</p>
        <p><span className="font-medium">Response Time:</span> Within 24 hours</p>
      </div>

      {/* FORM */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
        />

        <textarea
          placeholder="Describe your issue..."
          rows={4}
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
        />

        <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
          Send Message
        </button>
      </div>

    </div>
  );
}