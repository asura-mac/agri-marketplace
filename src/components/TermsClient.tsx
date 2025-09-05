"use client";

import { useTranslation } from "react-i18next";

export default function TermsAndConditionsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("terms.heading")}
          </h1>

          <div className="space-y-6">
            <div className="text-gray-700 leading-relaxed">
              <p>{t("terms.intro")}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section1_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section1_points_1")}</li>
                <li>{t("terms.section1_points_2")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section2_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section2_points_1")}</li>
                <li>{t("terms.section2_points_2")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section3_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section3_points_1")}</li>
                <li>{t("terms.section3_points_2")}</li>
                <li>{t("terms.section3_points_3")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section4_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section4_points_1")}</li>
                <li>{t("terms.section4_points_2")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section5_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section5_points_1")}</li>
                <li>{t("terms.section5_points_2")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section6_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section6_points_1")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("terms.section7_title")}
              </h2>
              <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>{t("terms.section7_points_1")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}