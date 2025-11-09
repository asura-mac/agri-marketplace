"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";



export const useBlogsChild = () => {
  const { t } = useTranslation();

  const blogs = [
      {
        id: 1,
        title: t("blogs.connections.title"),
        intro: t("blogs.connections.intro"),
        url: "https://i.ibb.co/fdL06VL6/Farmers-Traders-and-Buyers-The-New-Age-Connection-in-Agriculture.jpg",
        slug: 'connections'
      },
      {
        id: 2,
        title: t("blogs.digitalMandi.title"),
        url: "https://i.ibb.co/XfmzMGgT/Digital-Mandis-How-Technology-is-Transforming-Indian-Agriculture.jpg",
        slug: 'digital-mandis'
      },
      {
        id: 3,
        title: t("blogs.localPlatforms.title"),
        url: "https://i.ibb.co/nsrN13xK/Why-Local-Agricultural-Platforms-Matter-for-Rural-Growth.jpg",
        slug: 'local-platforms'
      },
      {
        id: 4,
        title: t("blogs.tradingSimple.title"),
        url: "https://i.ibb.co/zh1jB9cT/Future-of-Indian-Agriculture-Digital-Platforms-Leading-the-Way.jpg",
        slug: 'trading-made-simple'
      },
      {
        id: 5,
        title: t("blogs.riseOfDigital.title"),
        url: "https://i.ibb.co/X9g67sD/How-Digital-Agriculture-Platforms-Empower-Small-Farmers.jpg",
        slug: 'rise-of-digital'
      },
      {
        id: 6,
        title: t("blogs.transparency.title"),
        url: "https://i.ibb.co/ksNMnzL0/Direct-Farm-to-Buyer-Models-Cutting-Out-the-Middlemen.jpg",
        slug: 'transparency'
      },
      {
        id: 7,
        title: t("blogs.connectingWinWin.title"),
        url: "https://i.ibb.co/whP9WjRq/Technology-s-Role-in-Building-a-Transparent-Agriculture-System.jpg",
        slug: 'connecting-win-win'
      },
      {
        id: 8,
        title: t("blogs.onlineMandis.title"),
        url: "https://i.ibb.co/0ywPL62R/The-Rise-of-Online-Agriculture-Marketplaces-in-India.jpg",
        slug: 'online-mandis'
      },
      {
        id: 9,
        title: t("blogs.supplyChains.title"),
        url: "https://i.ibb.co/PsbhJtvr/Rural-India-and-the-Digital-Agriculture-Revolution.jpg",
        slug: 'supply-chains-tech'
      },
      {
        id: 10,
        title: t("blogs.kccGuide.title"),
        url: "https://i.ibb.co/WNTLLCQM/Kisan-Credit-Card-KCC-Modified-Interest-Subvention-Scheme-MISS.png",
        slug: 'Kcc-Guide'
      },
      {
        id: 11,
        title: t("blogs.rkvyGuide.title"),
        url: "https://i.ibb.co/CpN9NgwV/Rashtriya-Krishi-Vikas-Yojana-RKVY.png",
        slug: 'Rkvy-Guide'
      },
      {
        id: 12,
        title: t("blogs.midhGuide.title"),
        url: "https://i.ibb.co/Vc7nfPT6/Mission-for-Integrated-Development-of-Horticulture-MIDH.png",
        slug: 'Midh-Guide'
      },
      {
        id: 13,
        title: t("blogs.aifGuide.title"),
        url: "https://i.ibb.co/krfsBZm/Agriculture-Infrastructure-Fund-AIF.png",
        slug: 'Aif-Guide'
      },
      {
        id: 14,
        title: t("blogs.pmfbyGuide.title"),
        url: "https://i.ibb.co/d43Z5S1S/Pradhan-Mantri-Fasal-Bima-Yojana-PMFBY.png",
        slug: 'Pmfby-Guide'
      },
      {
        id: 15,
        title: t("blogs.pmKisanGuide.title"),
        url: "https://i.ibb.co/GQ5RbzX9/PM-Kisan-Samman-Nidhi-PM-KISAN.png",
        slug: 'PmKisan-Guide'
      },
      {
        id: 16,
        title: t("blogs.pmKusumGuide.title"),
        intro: t("blogs.pmKusumGuide.intro"),
        url: "https://i.ibb.co/27JQqRZF/Pradhan-Mantri-Kisan-Urja-Suraksha-Evam-Utthaan-Mahabhiyan-PM-KUSUM.png",
        slug: 'PmKusum-Guide'
      }
    ];

    const LatestBlog = () => {
      return (
        <div className="flex flex-col lg:gap-3 lg:w-[70%] w-[95%]">
          <p className="text-gray-900 text-3xl font-bold">Latest Blog</p>
          <hr className="w-[250px] h-2 bg-blue-500 rounded mt-1 mb-3" />
          <div className="m-0">
            <div className="relative lg:h-[690px] h-[690px] bg-gradient-to-t from-gray-700/70 via-white/20 to-transparent h-full rounded-2xl text-gray-900 border-white overflow-hidden">
              <Link
                href={`/blogs/${blogs[blogs.length - 1].slug}`}
                className="relative top-[85%] lg:left-[40%] left-[26%] p-3 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-800 text-white"
              >
                Click To Read
              </Link>
              <div className="relative rounded-2xl m-auto w-[60%] h-80 overflow-hidden">
                <Image
                  src={blogs[blogs.length - 1].url}
                  alt={blogs[blogs.length - 1].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h2 className="text-center font-bold  m-auto mt-5">
                {blogs[blogs.length - 1].title}
              </h2>
              <p className="w-[90%] m-auto mt-5">
                {blogs[blogs.length - 1].intro}
              </p>
            </div>
          </div>
        </div>
      );
    } 

    const OtherBlogs = () => {
      return (
        <div className="flex flex-col lg:gap-3 lg:w-[25%] w-[95%] h-[100%]">
          <p className="text-gray-900 text-3xl font-bold">Other Blogs</p>
          <hr className="w-[250px] h-2 bg-blue-500 rounded mt-1 mb-3" />
            <div className="h-[100%] overflow-y-scroll rounded-2xl flex lg:flex-col lg:gap-6 gap-36">
              {blogs.map((blog) => {
                const href = `/blogs/${blog.slug}`;
                return (
                  <Link key={blog.id} href={href} className="no-underline">
                    <div className="h-45 lg:w-full w-[200%] bg-white rounded-xl border-white flex lg:flex-row flex-col gap-3 items-center hover:shadow-md transition-shadow hover:cursor-pointer">
                      <div className="relative rounded-xl w-full h-[140px] lg:w-[140px] flex-shrink-0 overflow-hidden">
                        <Image
                          src={blog.url}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-700 mr-2 lg:text-[120%]">
                        {blog.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
      );
    }

    return {
      latestBlog: <LatestBlog />, 
      otherBlog: <OtherBlogs />
    }
}
