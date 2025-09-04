"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sky-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image src="/KM-LOGO-FULL.png" alt="KrushiMandi Logo" width={160} height={40} className="cursor-pointer" />
              </Link>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/people/Evool-Foundation/61575736152884/" 
                target='_blank'
                className="w-10 h-10 bg-white rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/evoolfoundation/"
                target='_blank'
                className="w-10 h-10 bg-white rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/evoolfoundation/"
                target='_blank'
                className="w-10 h-10 bg-white rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-9 h-7 text-pink-600" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"
                    fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4.5"
                    fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>

              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={handleBackToTop}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-white hover:border-gray-500 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {t('footer.backToTop')}
            </button>
          </div>

          {/* Pages Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">{t('footer.pages')}</h4>
            <nav className="space-y-3">
              <Link 
                href="/about" 
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('footer.aboutUs')}
              </Link>
              <Link 
                href="/faq" 
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('footer.faq')}
              </Link>
              <Link 
                href="/privacy" 
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link 
                href="/terms" 
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('footer.termsAndConditions')}
              </Link>
              <a 
                href="https://evoolfoundation.org/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t('footer.contactUs')}
              </a>
            </nav>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">{t('footer.address')}</h4>
            <address className="not-italic text-gray-700 text-sm leading-relaxed">
              105, P-17, Omkar CHS Ltd,<br />
              Noopur Nagar Mataji Mandir,<br />
              Mira Road, Thane, 401107
            </address>
            
            {/* Evool Foundation Badge */}
            <a 
                href="https://evoolfoundation.org/"
                target="blank"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="flex items-center gap-2 mt-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <img src="/evool-logo-pfp.jpg" alt="Evool Foundation" className="w-8 h-8 rounded-full object-cover" />
                </div>
                  <span className="text-gray-800 font-medium">{t('footer.evoolfoundation')}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6">
          <div className="bg-gray-900 text-white text-center py-3 px-4 rounded text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}
