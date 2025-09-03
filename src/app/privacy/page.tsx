import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - KrushiMandi",
  description: "Privacy policy and data protection information for KrushiMandi users.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
          
          <div className="space-y-6">
            <div className="text-gray-700 leading-relaxed">
              <p>
Krushi Mandi, an initiative by Evool Foundation, respects and protects the privacy of our users. This Privacy Policy explains how we collect, store, and use information when you access or use our platform.
</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Data We Collect</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Basic user details provided during registration (e.g., name, phone number, business type).</li>
                <li>Product information, including images, uploaded by farmers, traders, and companies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">2. How We Store Data</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>All data, including product images, is stored securely on Supabase cloud servers.</li>
                <li>We use standard security measures to protect against unauthorized access.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">3. How We Use Data</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>To connect farmers with traders, buyers, and agri-businesses.</li>
                <li>To improve the functionality and user experience of the platform.</li>
                <li>To display product listings publicly for buyers and traders.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">4. Sharing of Data</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>We do not sell or rent user data to third parties.</li>
                <li>Data may be shared with buyers, traders, and companies only for the purpose of connecting and completing trade.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Communication</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>By using our platform, you agree that other registered users (farmers, buyers, traders) can contact you via phone or WhatsApp based on your listing.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">6. No Payments on Platform</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Krushi Mandi does not process any kind of payments. All transactions happen directly between farmers and buyers.</li>
                <li>We are not responsible for any pre-payments, fraud, or disputes between buyers and sellers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">7. Your Rights</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>You may request deletion of your data or account by contacting us.</li>
                <li>We will remove your information from our active database within a reasonable time.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Krushi Mandi, an initiative by Evool Foundation, respects and protects the privacy of our users. This Privacy Policy explains how we collect, store, and use information when you access or use our platform.




// 7. Your Rights
// 	•	You may request deletion of your data or account by contacting us.
// 	•	We will remove your information from our active database within a reasonable time.
