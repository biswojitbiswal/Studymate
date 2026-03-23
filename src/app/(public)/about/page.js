export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pt-28 space-y-8">

      {/* HERO */}
      <section className="text-center space-y-2">
        <h1 className="text-2xl font-bold">About Studynest</h1>
        <p className="text-gray-500 text-sm">
          Your smart companion for managing classes, students, and learning — all in one place.
        </p>
      </section>

      {/* WHAT IS STUDYNEST */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">What is Studynest?</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Studynest is a modern platform designed to simplify the way tutors,
          coaching institutes, and students manage their academic journey.
          From class scheduling to student tracking, everything is organized
          in one seamless system.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Our Mission</h2>
        <p className="text-gray-600 text-sm">
          To empower educators and students with simple, powerful tools that
          enhance productivity and learning experience.
        </p>

        <h2 className="font-semibold text-lg mt-4">Our Vision</h2>
        <p className="text-gray-600 text-sm">
          To become the go-to platform for education management across
          coaching institutes and independent tutors.
        </p>
      </section>

      {/* FEATURES */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">What We Offer</h2>

        <ul className="text-gray-600 text-sm space-y-2 list-disc pl-5">
          <li>📅 Smart class scheduling and reminders</li>
          <li>👨‍🎓 Student management system</li>
          <li>📊 Attendance and performance tracking</li>
          <li>💬 In-app communication (coming soon)</li>
          <li>🔔 Notification system for updates</li>
        </ul>
      </section>

      {/* WHY CHOOSE US */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Why Choose Studynest?</h2>

        <ul className="text-gray-600 text-sm space-y-2 list-disc pl-5">
          <li>Simple and easy-to-use interface</li>
          <li>Designed for real classroom needs</li>
          <li>Fast and reliable performance</li>
          <li>Constant updates and improvements</li>
        </ul>
      </section>

      {/* CONTACT */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Contact & Support</h2>
        <p className="text-gray-600 text-sm">
          Need help or have feedback? Reach out to us anytime.
        </p>

        <div className="text-sm text-gray-700 space-y-1">
          <p>Email: support@studynest.com</p>
          <p>Response Time: Within 24 hours</p>
        </div>
      </section>

      {/* VERSION */}
      <section className="text-center text-xs text-gray-400 pt-4">
        Version 1.0.0 • © {new Date().getFullYear()} Studynest
      </section>

    </div>
  );
}