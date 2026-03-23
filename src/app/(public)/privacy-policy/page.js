export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pt-26 space-y-6 pb-10">

      <div>
        <h1 className="text-xl font-semibold">Privacy Policy</h1>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>

      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">

        <section>
          <h2 className="font-medium text-black">1. Information We Collect</h2>
          <p>
            We collect basic user information such as name, email, and usage data
            to improve our services.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-black">2. How We Use Information</h2>
          <p>
            Your data is used to provide and improve Studynest services, including
            class management and notifications.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-black">3. Data Security</h2>
          <p>
            We take appropriate security measures to protect your data from
            unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-black">4. User Rights</h2>
          <p>
            You can request to update or delete your data anytime by contacting us.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-black">5. Contact Us</h2>
          <p>
            For any privacy-related questions, email us at support@studynest.com.
          </p>
        </section>

      </div>

    </div>
  );
}