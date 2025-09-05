"use client";

import { useTranslation } from "react-i18next";

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t("faqs.heading")}</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("faqs.q1")}</h2>
              <p className="text-gray-700 leading-relaxed">
                 {t("faqs.a1")}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q2')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a2')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q3')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a3')}              
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q4')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a4')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q5')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a5')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q6')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a6')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q7')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a7')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q8')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a8')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q9')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a9')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q10')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a10')}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('faqs.q11')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('faqs.a11')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}