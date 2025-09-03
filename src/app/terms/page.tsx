import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - KrushiMandi",
  description: "Terms and conditions for using KrushiMandi agricultural marketplace platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms and Conditions</h1>
          
          <div className="space-y-6">
            <div className="text-gray-700 leading-relaxed">
              <p>Welcome to Krushi Mandi, a platform by Evool Foundation. By accessing or using our platform, you agree to the following Terms and Conditions:</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Nature of Platform</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Krushi Mandi is a free platform that connects farmers, traders, buyers, and agricultural businesses.</li>
                <li>We provide listings, product information, and contact details but do not participate in actual trade.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">2. User Responsibilities</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Users are responsible for the accuracy of the information and product images they upload.</li>
                <li>Farmers, traders, and buyers must directly verify the quality, price, and authenticity of any product before making a purchase.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">3. Payments and Transactions</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Krushi Mandi does not provide any payment gateway or escrow service.</li>
                <li>Any payments made outside the platform are solely between buyer and seller.</li>
                <li>We are not responsible for fraud, non-delivery, pre-payments, or disputes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">4. Content Ownership</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Users retain ownership of the content and product images they upload.</li>
                <li>By uploading content, users grant Krushi Mandi a license to display and share the content publicly on the platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Limitation of Liability</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Krushi Mandi and Evool Foundation are not liable for any financial loss, fraud, or disputes arising between farmers, traders, buyers, or companies.</li>
                <li>We only act as a connecting platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">6. Termination of Use</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>We reserve the right to suspend or terminate accounts that misuse the platform, upload false information, or violate these Terms.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">7. Governing Law</h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>These Terms shall be governed by and interpreted under the laws of India.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
