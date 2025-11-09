"use client";

import { useTranslation } from "react-i18next";
// import { TFunction } from "i18next";
import { useBlogsChild } from "./Blogs";
import styles from "./BlogPage.module.css"
import Image from "next/image";
// import { Content } from "next/font/google";


// Helper function to render old format content
// function renderOldFormatContent(t: TFunction, blogKey: string): string {
//   const blog = t(blogKey, { returnObjects: true }) as any;
//   let html = '';

//   // Render each section
//   Object.entries(blog).forEach(([key, section]: [string, any]) => {
//     if (key === 'title' || key === 'intro') return;

//     html += `
//       <section class="blog-section">
//         ${section.title ? `<h2>${section.title}</h2>` : ''}
//         ${section.content ? `<p>${section.content}</p>` : ''}
//         ${section.points ? `
//           <ul>
//             ${section.points.map((point: string) => `<li>${point}</li>`).join('')}
//           </ul>
//         ` : ''}
//         ${section.summary ? `<p class="summary">${section.summary}</p>` : ''}
//       </section>
//     `;
//   });

//   return html;
// }

interface BlogContentProps {
  slug: string;
}

export default function BlogContent({ slug }: BlogContentProps) {
    const { t, ready } = useTranslation();
    const {otherBlog} = useBlogsChild();
    
    // Show loading state while translations are being loaded
    if (!ready) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    const blogs = [
      {
        id: 1,
        title: t("blogs.connections.title"),
        intro: t("blogs.connections.intro"),
        content: t("blogs.connections.content"),
        url: "https://i.ibb.co/fdL06VL6/Farmers-Traders-and-Buyers-The-New-Age-Connection-in-Agriculture.jpg",
        slug: 'connections'
      },
      {
        id: 2,
        title: t("blogs.digitalMandi.title"),
        intro: t("blogs.digitalMandi.intro"),
        content: t("blogs.digitalMandi.content"),
        url: "https://i.ibb.co/XfmzMGgT/Digital-Mandis-How-Technology-is-Transforming-Indian-Agriculture.jpg",
        slug: 'digital-mandis'
      },
      {
        id: 3,
        title: t("blogs.localPlatforms.title"),
        intro: t("blogs.localPlatforms.intro"),
        content: t("blogs.localPlatforms.content"),
        url: "https://i.ibb.co/nsrN13xK/Why-Local-Agricultural-Platforms-Matter-for-Rural-Growth.jpg",
        slug: 'local-platforms'
      },
      {
        id: 4,
        title: t("blogs.tradingSimple.title"),
        intro: t("blogs.tradingSimple.intro"),
        content: t("blogs.tradingSimple.content"),
        url: "https://i.ibb.co/zh1jB9cT/Future-of-Indian-Agriculture-Digital-Platforms-Leading-the-Way.jpg",
        slug: 'trading-made-simple'
      },
      {
        id: 5,
        title: t("blogs.riseOfDigital.title"),
        intro: t("blogs.riseOfDigital.intro"),
        content: t("blogs.riseOfDigital.content"),
        url: "https://i.ibb.co/X9g67sD/How-Digital-Agriculture-Platforms-Empower-Small-Farmers.jpg",
        slug: 'rise-of-digital'
      },
      {
        id: 6,
        title: t("blogs.transparency.title"),
        intro: t("blogs.transparency.intro"),
        content: t("blogs.transparency.content"),
        url: "https://i.ibb.co/ksNMnzL0/Direct-Farm-to-Buyer-Models-Cutting-Out-the-Middlemen.jpg",
        slug: 'transparency'
      },
      {
        id: 7,
        title: t("blogs.connectingWinWin.title"),
        intro: t("blogs.connectingWinWin.intro"),
        content: t("blogs.connectingWinWin.content"),
        url: "https://i.ibb.co/whP9WjRq/Technology-s-Role-in-Building-a-Transparent-Agriculture-System.jpg",
        slug: 'connecting-win-win'
      },
      {
        id: 8,
        title: t("blogs.onlineMandis.title"),
        intro: t("blogs.onlineMandis.intro"),
        content: t("blogs.onlineMandis.content"),
        url: "https://i.ibb.co/0ywPL62R/The-Rise-of-Online-Agriculture-Marketplaces-in-India.jpg",
        slug: 'online-mandis'
      },
      {
        id: 9,
        title: t("blogs.supplyChains.title"),
        intro: t("blogs.supplyChains.intro"),
        content: t("blogs.supplyChains.content"),
        url: "https://i.ibb.co/PsbhJtvr/Rural-India-and-the-Digital-Agriculture-Revolution.jpg",
        slug: 'supply-chains-tech'
      },
      {
        id: 10,
        title: t("blogs.kccGuide.title"),
        intro: t("blogs.kccGuide.intro"),
        content: t("blogs.kccGuide.content"),
        url: "https://i.ibb.co/HfNZmHq4/Kisan-Credit-Card-KCC-Modified-Interest-Subvention-Scheme-MISS.png",
        slug: 'Kcc-Guide'
      },
      {
        id: 11,
        title: t("blogs.rkvyGuide.title"),
        intro: t("blogs.rkvyGuide.intro"),
        content: t("blogs.rkvyGuide.content"),
        url: "https://i.ibb.co/CpN9NgwV/Rashtriya-Krishi-Vikas-Yojana-RKVY.png",
        slug: 'Rkvy-Guide'
      },
      {
        id: 12,
        title: t("blogs.midhGuide.title"),
        intro: t("blogs.midhGuide.intro"),
        content: t("blogs.midhGuide.content"),
        url: "https://i.ibb.co/BVRZs6ZW/Mission-for-Integrated-Development-of-Horticulture-MIDH.png",
        slug: 'Midh-Guide'
      },
      {
        id: 13,
        title: t("blogs.aifGuide.title"),
        intro: t("blogs.aifGuide.intro"),
        content: t("blogs.aifGuide.content"),
        url: "https://i.ibb.co/krfsBZm/Agriculture-Infrastructure-Fund-AIF.png",
        slug: 'Aif-Guide'
      },
      {
        id: 14,
        title: t("blogs.pmfbyGuide.title"),
        intro: t("blogs.pmfbyGuide.intro"),
        content: t("blogs.pmfbyGuide.content"),
        url: "https://i.ibb.co/99VpVjHw/Pradhan-Mantri-Fasal-Bima-Yojana-PMFBY.png",
        slug: 'Pmfby-Guide'
      },
      {
        id: 15,
        title: t("blogs.pmKisanGuide.title"),
        intro: t("blogs.pmKisanGuide.intro"),
        content: t("blogs.pmKisanGuide.content"),
        url: "https://i.ibb.co/p69XzYf5/PM-Kisan-Samman-Nidhi-PM-KISAN.png",
        slug: 'PmKisan-Guide'
      },
      {
        id: 16,
        title: t("blogs.pmKusumGuide.title"),
        intro: t("blogs.pmKusumGuide.intro"),
        content: t("blogs.pmKusumGuide.content"),
        url: "https://i.ibb.co/27JQqRZF/Pradhan-Mantri-Kisan-Urja-Suraksha-Evam-Utthaan-Mahabhiyan-PM-KUSUM.png",
        slug: 'PmKusum-Guide'
      }
    ];
    console.log('Current slug:', slug);
    console.log('Available slugs:', blogs.map(b => b.slug));
    
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Blog not found for slug: {slug}</p>
                </div>
            </div>
        );
    }
    return (
      <div className="min-h-screen bg-gray-100 w-full ">
        <article className="mx-auto p-4">
          {blog.url && (
            <div className="relative w-[90vw] aspect-video lg:mb-16 rounded-lg shadow-lg m-auto overflow-hidden">
              <Image
                src={blog.url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="lg:w-full w-full lg:h-[100%] flex flex-row flex-wrap w-full gap-5 justify-center mt-1 mb-7">
            <div className="lg:w-[70%] w-[95%] rounded-2xl text-gray-900 border-white">
              <h1 className="lg:text-5xl text-xl text-gray-900 font-bold mb-6 ml-[40px] mr-[40px]">
                {blog.title}
              </h1>
              <div className="lg:text-lg w-[100%] text-[0.9rem] text-gray-800 mb-8 bg-yellow-100 rounded-2xl p-5 flex flex-row items-center gap-3">
                <div className="w-5 min-h-[200px] bg-blue-500 rounded border-blue-500"></div>
                {blog.intro}
              </div>
              <div
                className={styles.blogContainer}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
            {otherBlog}
          </div>
        </article>
      </div>
    );
}