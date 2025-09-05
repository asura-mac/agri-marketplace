"use client";

import { useTranslation } from "react-i18next";

export default function AboutClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("about.heading")}
          </h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700 leading-relaxed">{t("about.para1")}</p>
            <p className="text-gray-700 leading-relaxed">{t("about.para2")}</p>
            <p className="text-gray-700 leading-relaxed">{t("about.para3")}</p>
            <p className="text-gray-700 leading-relaxed">{t("about.para4")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}