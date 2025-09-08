import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { Contact } from 'lucide-react';
// import { updateListing } from './listings-utils';

// English translations
const enTranslations = {
  header: {
    searchPlaceholder: "Search products, categories, locations...",
    searchPlaceholderMobile: "Search products...",
    filter: "Filter",
    clearFilter: "Clear Filter",
    sell: "Sell",
    profile: "Profile",
    login: "Login",
    setLocation: "Set location",
  },
  categories: {
    grains: "Grains",
    pulses: "Pulses",
    fruits: "Fruits",
    vegetables: "Vegetables",
    oilseeds: "Oilseeds",
    seeds: "Seeds",
    spices: "Spices",
    flowers: "Flowers",
    tea: "Tea",
    nuts: "Nuts",
    dairy: "Dairy",
    honey: "Honey",
    cattlefeed: "Cattle Feed",
    nurseryplants: "Nursery",
    ayurvedic: "Ayurvedic",
    fish: "Fish",
    fertilizer: "Fertilizer",
    equipment: "Equipment",
  },
  categoryDescriptions: {
    grains: "Rice, wheat, corn, barley, and other cereals",
    pulses: "Lentils, chickpeas, beans, and legumes",
    fruits: "Fresh fruits, seasonal produce",
    vegetables: "Fresh vegetables, leafy greens, root vegetables",
    oilseeds: "Sunflower, mustard, sesame, and other oil seeds",
    seeds: "Seeds for planting and cultivation",
    spices: "Turmeric, chili, coriander, and aromatic spices",
    flowers: "Fresh flowers, garlands, decorative flowers",
    tea: "Tea leaves, herbal teas, organic varieties",
    nuts: "Almonds, cashews, walnuts, and dry fruits",
    dairy: "Milk, cheese, butter, and dairy products",
    honey: "Honey, bee products, and honey-based products",
    cattlefeed: "Cattle feed, poultry feed, and other animal feed",
    nurseryplants: "Nursery plants, seeds, and other nursery products",
    ayurvedic: "Ayurvedic products, herbs, and other ayurvedic products",
    fish: "Fresh fish, seafood, aquaculture products",
    fertilizer: "Organic and chemical fertilizers, soil enhancers",
    equipment: "Farming tools, machinery, and agricultural equipment",
  },
  units: {
    kg: "kg",
    quintal: "quintal",
    ton: "ton",
    nos: "nos",
    litre: "litre",
    dozen: "dozen",
  },
  status: {
    active: "Active",
    inactive: "Inactive",
    sold: "Sold",
  },
  listing: {
    minimumOrder: "Minimum Order Qty.",
    pricePerUnit: "Price Per Unit",
    contact: "Contact",
    call: "Call",
    whatsapp: "WhatsApp",
    getDirections: "Get Direction",
    noPhone: "No Phone",
    noWhatsapp: "No WhatsApp",
    locationNotSpecified: "Location not specified",
    notSpecified: "Not specified",
    sellerInfo: "Seller Information",
    moreFromSeller: "More from this seller",
    listingDetails: "Listing Details",
    relatedListings: "Related Listings",
    categoryProducts: "{{category}} Products",
    browseCategoryDescription:
      "Browse fresh {{category}} from verified sellers",
  },
  search: {
    searchResults: 'Search: "{{query}}"',
    stateFilter: "State: {{state}}",
    listingsFound: "{{count}} listing found",
    listingsFound_plural: "{{count}} listings found",
    noResultsFound: "No Results Found",
    noListingsAvailable: "No Listings Available",
    clearSearch: "Clear Search",
    clearFilter: "Clear Filter",
    adjustSearch:
      "Try adjusting your search terms or filters to find what you're looking for.",
    noListingsYet:
      "No products are listed yet. Be the first to list your products!",
    filterByState: "Filter by State",
    showingListings: "Showing listings from {{state}}",
  },
  footer: {
    backToTop: "Back To Top",
    pages: "Pages",
    aboutUs: "About Us",
    faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    termsAndConditions: "Terms And Conditions",
    contactUs: "Contact Us",
    address: "Address",
    evoolfoundation: "Evool Foundation",
    copyright: " KRUSHI MANDI. All rights reserved",
    description:
      "Krushi Mandi is a free platform by Evool Foundation, created to connect farmers, buyers and traders while promoting fair prices and farmer empowerment.",
  },
  onboarding: {
    welcomeMessage:
      "Welcome to KrushiMandi! Please complete your profile to get started.",
    role: "Role",
    farmer: "Farmer",
    trader: "Trader",
    contactNumber: "Contact number",
    state: "State/UT",
    selectState: "Select state",
    district: "District",
    pincode: "Pincode",
    location: "Location",
    detecting: "Detecting...",
    detect: "📍 Detect",
    completeProfile: "Complete Profile",
    locationDetectHelp:
      'Click "📍 Detect" to automatically fill your location, or enter it manually.',
    errorSaving: "Error saving profile. Please try again.",
    profileCompleted: "Profile completed successfully!",
    pleaseWait: "Please wait...",
  },
  sell: {
    selectCategory: "Select Category",
    createListing: "Create Listing",
    updateListing: "Update Listing",
    productDetails: "PRODUCT DETAILS",
    productName: "Product Name",
    productNamePlaceholder: "Enter product name",
    description: "Description",
    descriptionPlaceholder: "Describe your product",
    pricePerUnit: "Price Per Unit",
    pricePerUnitPlaceholder: "Enter price",
    unit: "Unit",
    selectUnit: "Select unit",
    minimumOrder: "Minimum Order",
    minimumOrderPlaceholder: "Enter minimum order quantity",
    locationContactDetails: "LOCATION & CONTACT DETAILS",
    state: "State",
    selectState: "Select your state",
    district: "District",
    districtPlaceholder: "Enter your district",
    contactPhone: "Contact Phone Number",
    contactPhonePlaceholder: "Enter phone number",
    whatsappNumber: "WhatsApp Number",
    whatsappPlaceholder: "Enter WhatsApp number",
    sameAsPhone: "Same as phone number",
    imageUpload: "IMAGE UPLOAD",
    uploadImages: "Upload Images (Max 3)",
    autoFillLocation: "Auto-fill location details",
    detectLocation: "📍 Detect Location",
    dragDropImages: "Drag and drop images here, or click to select",
    uploading: "Uploading...",
    listingCreated: "Listing created successfully!",
    errorCreating: "Error creating listing. Please try again.",
    pleaseWait: "Please wait...",
    requiredField: "This field is required",
    invalidPrice: "Please enter a valid price",
    invalidPhone: "Please enter a valid phone number",
    upateDetails: "Update the details below to modify your product listing",
    createListingForm: "Fill in the details below to create your product listing",
  },
  profile: {
    myProfile: "My Profile",
    personalInformation: "Personal Information",
    role: "Role",
    contactInfo: "Contact Info",
    state: "State",
    district: "District",
    pincode: "Pincode",
    location: "Location",
    editProfile: "Edit Profile",
    yourListings: "Your Listings",
    addNewListing: "+ Add New Listing",
    active: "Active",
    inactive: "Inactive",
    edit: "Edit",
    delete: "Delete",
    noListings: "No listings found. Start by creating your first listing!",
    confirmDelete: "Are you sure you want to delete this listing?",
    deleteSuccess: "Listing deleted successfully",
    deleteError: "Error deleting listing",
    statusUpdated: "Listing status updated",
    statusError: "Error updating status",
  },
  auth: {
    loginTitle: "Login to KrushiMandi",
    loginSubtitle: "Connect with farmers and traders across India",
    continueWithGoogle: "Continue with Google",
    signingIn: "Signing in...",
    loginError: "Login failed. Please try again.",
    logout: "Logout",
    loggingOut: "Logging out...",
  },
  language: {
    english: "English",
    hindi: "हिंदी",
    selectLanguage: "Select Language",
  },
  validation: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidPhone: "Please enter a valid phone number",
    invalidPrice: "Please enter a valid price",
    tooShort: "Too short",
    tooLong: "Too long",
    invalidFormat: "Invalid format",
  },
  navigation: {
    home: "Home",
    categories: "Categories",
    listings: "Listings",
    profile: "Profile",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    termsConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    faq: "FAQ",
    backToHome: "Back to Home",
  },
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    cancel: "Cancel",
    save: "Save",
    submit: "Submit",
    close: "Close",
    next: "Next",
    previous: "Previous",
    more: "More",
    showLess: "Show Less",
    tryAgain: "Try Again",
    retry: "Retry",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    ok: "OK",
    showingResults: "Showing {current} of {total} products",
    loadMore: "Load More ({{remaining}} remaining)",
    endOfListings: "You've reached the end of the listings",
    noDataFound: "No data found",
    somethingWentWrong: "Something went wrong",
    pleaseWait: "Please wait...",
    processing: "Processing...",
    postYourAd: "POST YOUR AD",
    signInMessage: "Sign in with Google to continue",
    welcome: "Welcome",
    signInBtn: "Continue with Google",
    freshProduct: "Fresh Products Near You",
    freshProductDec:
      "Discover the best agricultural products from verified farmers and traders",
    chooseFromCategory:
      "Choose the category that best describes what you want to sell. This helps buyers find your products more easily.",
    chooseACategory: "CHOOSE A CATEGORY",
    needHelp: "Need Help?",
    helpType:
      "Can't find the right category? Contact our support team for assistance.",
    ContactSupport: "Contact Support",
    categoryNotFound: "Category Not Found",
    creating: "creating",
    updating: "updating",
    backToCat: "Back to Categories",
    loadingListingData: "Loading listing data",
    pleaseWaitEditing: "Please wait while we load the listing for editing.",
    pleaseWaitPrepareForm: "Please wait while we prepare the form.",
    listing: "Listing",
    sortedBy: "Sorted by most recent",
  },
  about: {
    heading: "Krushi Mandi – An Evool Foundation Initiative",
    para1:
      "Krushi Mandi is a farmer-first digital platform created to connect farmers directly with traders, buyers, and agricultural businesses. The purpose of this initiative is to remove middlemen, ensure fair pricing, and give farmers better access to genuine buyers.",
    para2:
      "On Krushi Mandi, farmers can sell a wide range of products such as grains, pulses, seeds, oilseeds, fruits, vegetables, nuts, dairy, fish, flowers, tea, and spices. Along with this, agricultural equipment companies and fertilizer suppliers can also list their products and connect with farmers and traders in one place.",
    para3:
      "The process is simple and transparent. Farmers and traders can communicate directly through phone calls or WhatsApp without extra layers or hidden costs. This helps farmers reach more buyers and sell their produce at the right value.",
    para4:
      "Backed by Evool Foundation’s mission of sustainability and social good, Krushi Mandi is building a digital agriculture marketplace that supports fair trade, empowers farmers, and strengthens the rural economy of India.",
  },
  faqs: {
    heading: "Krushi Mandi – Frequently Asked Questions (FAQ)",

    q1: "What is Krushi Mandi?",
    a1: "Krushi Mandi is a digital agriculture marketplace in India by Evool Foundation. It connects farmers directly with buyers and traders without middlemen. Farmers can sell crops online, and buyers can easily find local farmers near me through the Krushi Mandi app.",

    q2: "How does Krushi Mandi work for farmers and buyers?",
    a2: "Farmers can list their products on the online mandi for farmers, and buyers or traders can connect with them directly through phone calls or WhatsApp. This makes it simple to buy vegetables online or purchase wholesale fruits and vegetables near me directly from farmers.",

    q3: "What products can I buy or sell on Krushi Mandi?",
    a3: "The platform supports a wide range of categories including grains, pulses, seeds, oilseeds, fruits, vegetables, dairy, fish, flowers, tea, spices, and nuts. Agricultural equipment companies and fertilizer suppliers can also list their products for farmers.",

    q4: "Can I use Krushi Mandi to find farmers near me?",
    a4: "Yes, Krushi Mandi allows you to connect with local farmers near me who are ready to sell farm produce directly. This makes it easier for buyers to purchase fresh produce directly from farmers at fair prices.",

    q5: "Is Krushi Mandi free for farmers?",
    a5: "Yes, Krushi Mandi app is free for farmers to register and list their crops. The goal is to provide a fair price and give farmers access to more buyers without paying high commissions.",

    q6: "Who can buy from Krushi Mandi?",
    a6: "Anyone including wholesale buyers, retailers, hotels, restaurants, and traders can buy directly from farmers. Businesses searching for wholesale vegetables near me or fruits near me can use the Krushi Mandi platform.",

    q7: "How do farmers and traders communicate?",
    a7: "Communication is direct through phone calls or WhatsApp. This makes Krushi Mandi a trusted farmer-to-buyer platform, helping both sides negotiate and close deals quickly.",

    q8: "What makes Krushi Mandi different from traditional mandis?",
    a8: "Unlike traditional mandis with heavy middlemen charges, Krushi Mandi is an online mandi for farmers where crops go straight from farm to market. Buyers get fresh produce and farmers get fair prices without exploitation.",

    q9: "Can agricultural equipment and fertilizer companies join Krushi Mandi?",
    a9: "Yes, Krushi Mandi is open to agriculture equipment manufacturers and fertilizer companies who want to showcase their products directly to farmers.",

    q10: "Is Krushi Mandi available across India?",
    a10: "Yes, Krushi Mandi is accessible across India. Whether you are looking for wholesale fruits and vegetables near me, local farmers near me, or want to use an online mandi for farmers, Krushi Mandi brings everything to one platform.",

    q11: "What is the mission of Krushi Mandi?",
    a11: "The mission of Krushi Mandi is to empower farmers, build a sustainable agriculture marketplace in India, reduce middlemen, and strengthen the rural economy by providing fair trade opportunities.",
  },
  privacy: {
    heading: "Privacy Policy",
    intro:
      "Krushi Mandi, an initiative by Evool Foundation, respects and protects the privacy of our users. This Privacy Policy explains how we collect, store, and use information when you access or use our platform.",

    section1_title: "1. Data We Collect",
    section1_points_1:
      "Basic user details provided during registration (e.g., name, phone number, business type).",
    section1_points_2:
      "Product information, including images, uploaded by farmers, traders, and companies.",

    section2_title: "2. How We Store Data",
    section2_points_1:
      "All data, including product images, is stored securely on Supabase cloud servers.",
    section2_points_2:
      "We use standard security measures to protect against unauthorized access.",

    section3_title: "3. How We Use Data",
    section3_points_1:
      "To connect farmers with traders, buyers, and agri-businesses.",
    section3_points_2:
      "To improve the functionality and user experience of the platform.",
    section3_points_3:
      "To display product listings publicly for buyers and traders.",

    section4_title: "4. Sharing of Data",
    section4_points_1: "We do not sell or rent user data to third parties.",
    section4_points_2:
      "Data may be shared with buyers, traders, and companies only for the purpose of connecting and completing trade.",

    section5_title: "5. Communication",
    section5_points_1:
      "By using our platform, you agree that other registered users (farmers, buyers, traders) can contact you via phone or WhatsApp based on your listing.",

    section6_title: "6. No Payments on Platform",
    section6_points_1:
      "Krushi Mandi does not process any kind of payments. All transactions happen directly between farmers and buyers.",
    section6_points_2:
      "We are not responsible for any pre-payments, fraud, or disputes between buyers and sellers.",

    section7_title: "7. Your Rights",
    section7_points_1:
      "You may request deletion of your data or account by contacting us.",
    section7_points_2:
      "We will remove your information from our active database within a reasonable time.",
  },
  terms: {
    heading: "Terms and Conditions",
    intro:
      "Welcome to Krushi Mandi, a platform by Evool Foundation. By accessing or using our platform, you agree to the following Terms and Conditions:",

    section1_title: "1. Nature of Platform",
    section1_points_1:
      "Krushi Mandi is a free platform that connects farmers, traders, buyers, and agricultural businesses.",
    section1_points_2:
      "We provide listings, product information, and contact details but do not participate in actual trade.",

    section2_title: "2. User Responsibilities",
    section2_points_1:
      "Users are responsible for the accuracy of the information and product images they upload.",
    section2_points_2:
      "Farmers, traders, and buyers must directly verify the quality, price, and authenticity of any product before making a purchase.",

    section3_title: "3. Payments and Transactions",
    section3_points_1:
      "Krushi Mandi does not provide any payment gateway or escrow service.",
    section3_points_2:
      "Any payments made outside the platform are solely between buyer and seller.",
    section3_points_3:
      "We are not responsible for fraud, non-delivery, pre-payments, or disputes.",

    section4_title: "4. Content Ownership",
    section4_points_1:
      "Users retain ownership of the content and product images they upload.",
    section4_points_2:
      "By uploading content, users grant Krushi Mandi a license to display and share the content publicly on the platform.",

    section5_title: "5. Limitation of Liability",
    section5_points_1:
      "Krushi Mandi and Evool Foundation are not liable for any financial loss, fraud, or disputes arising between farmers, traders, buyers, or companies.",
    section5_points_2: "We only act as a connecting platform.",

    section6_title: "6. Termination of Use",
    section6_points_1:
      "We reserve the right to suspend or terminate accounts that misuse the platform, upload false information, or violate these Terms.",

    section7_title: "7. Governing Law",
    section7_points_1:
      "These Terms shall be governed by and interpreted under the laws of India.",
  },
  address: {
    line_1: "105, P-17, Omkar CHS Ltd,",
    line_2: "Noopur Nagar Mataji Mandir,",
    line_3: "Mira Road, Thane, 401107",
  },
};

// Hindi translations
const hiTranslations = {
  header: {
    searchPlaceholder: "उत्पाद, श्रेणियां, स्थान खोजें...",
    searchPlaceholderMobile: "उत्पाद खोजें...",
    filter: "फ़िल्टर",
    clearFilter: "फ़िल्टर साफ़ करें",
    sell: "बेचें",
    profile: "प्रोफ़ाइल",
    login: "लॉगिन",
    setLocation: "स्थान सेट करें",
  },
  categories: {
    grains: "अनाज",
    pulses: "दालें",
    fruits: "फल",
    vegetables: "सब्जियां",
    oilseeds: "तिलहन",
    seeds: "बीज",
    spices: "मसाले",
    flowers: "फूल",
    tea: "चाय",
    nuts: "सूखे मेवे",
    dairy: "डेयरी",
    fish: "मछली",
    honey: "शहद",
    cattlefeed: "गाय का भोजन",
    nurseryplants: "नर्सरी पौधे",
    ayurvedic: "आयुर्वेदिक",
    fertilizer: "उर्वरक",
    equipment: "उपकरण",
  },
  categoryDescriptions: {
    grains: "चावल, गेहूं, मक्का, जौ और अन्य अनाज",
    pulses: "मसूर, चना, सेम और अन्य दलहन",
    fruits: "ताजे फल, मौसमी उत्पाद",
    vegetables: "ताजी सब्जियां, हरी पत्तेदार, कंद वाली सब्जियां",
    oilseeds: "सूरजमुखी, सरसों, तिल और अन्य तिलहन",
    seeds: "बुवाई और खेती के लिए बीज",
    spices: "हल्दी, मिर्च, धनिया और अन्य मसाले",
    flowers: "ताजे फूल, मालाएँ, सजावटी फूल",
    tea: "चाय की पत्तियां, हर्बल चाय, जैविक किस्में",
    nuts: "बादाम, काजू, अखरोट और सूखे मेवे",
    dairy: "दूध, पनीर, मक्खन और डेयरी उत्पाद",
    honey: "शहद, मधुमक्खी उत्पाद और शहद आधारित उत्पाद",
    cattlefeed: "पशु चारा, मुर्गी चारा और अन्य पशु आहार",
    nurseryplants: "नर्सरी पौधे, बीज और अन्य नर्सरी उत्पाद",
    ayurvedic: "आयुर्वेदिक उत्पाद, जड़ी-बूटियां और अन्य आयुर्वेदिक वस्तुएं",
    fish: "ताज़ी मछली, समुद्री भोजन, जलीय उत्पाद",
    fertilizer: "जैविक और रासायनिक खाद, मिट्टी सुधारक",
    equipment: "खेती के औज़ार, मशीनरी और कृषि उपकरण",
  },
  units: {
    kg: "किग्रा",
    quintal: "क्विंटल",
    ton: "टन",
    nos: "संख्या",
    litre: "लीटर",
    dozen: "दोहरा",
  },
  status: {
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    sold: "बेचा गया",
  },
  listing: {
    minimumOrder: "न्यूनतम ऑर्डर मात्रा",
    pricePerUnit: "प्रति यूनिट कीमत",
    contact: "संपर्क",
    call: "कॉल",
    whatsapp: "व्हाट्सऐप",
    getDirections: "दिशा प्राप्त करें",
    noPhone: "फोन नहीं",
    noWhatsapp: "व्हाट्सऐप नहीं",
    locationNotSpecified: "स्थान निर्दिष्ट नहीं",
    notSpecified: "निर्दिष्ट नहीं",
    sellerInfo: "विक्रेता की जानकारी",
    moreFromSeller: "इस विक्रेता से और अधिक",
    listingDetails: "लिस्टिंग विवरण",
    relatedListings: "संबंधित लिस्टिंग",
    categoryProducts: "{{category}} उत्पाद",
    browseCategoryDescription:
      "सत्यापित विक्रेताओं से ताजा {{category}} ब्राउज़ करें",
  },
  search: {
    searchResults: 'खोज: "{{query}}"',
    stateFilter: "राज्य: {{state}}",
    listingsFound: "{{count}} लिस्टिंग मिली",
    listingsFound_plural: "{{count}} लिस्टिंग मिलीं",
    noResultsFound: "कोई परिणाम नहीं मिला",
    noListingsAvailable: "कोई लिस्टिंग उपलब्ध नहीं",
    clearSearch: "खोज साफ़ करें",
    clearFilter: "फ़िल्टर साफ़ करें",
    adjustSearch:
      "आप जो खोज रहे हैं उसे खोजने के लिए अपने खोज शब्दों या फ़िल्टर को समायोजित करने का प्रयास करें।",
    noListingsYet:
      "अभी तक कोई उत्पाद सूचीबद्ध नहीं है। अपने उत्पादों को सूचीबद्ध करने वाले पहले व्यक्ति बनें!",
    filterByState: "राज्य के अनुसार फ़िल्टर करें",
    showingListings: "{{state}} की लिस्टिंग दिखाई जा रही है",
  },
  footer: {
    backToTop: "शीर्ष पर वापस",
    pages: "पृष्ठ",
    aboutUs: "हमारे बारे में",
    faq: "सामान्य प्रश्न",
    privacyPolicy: "गोपनीयता नीति",
    termsAndConditions: "नियम और शर्तें",
    contactUs: "संपर्क करें",
    address: "पता",
    evoolfoundation: "इवूल फाउंडेशन",
    copyright: " कृषि मंडी । सभी अधिकार सुरक्षित हैं",
    description:
      "कृषि मंडी इवूल फाउंडेशन का निःशुल्क प्लेटफ़ॉर्म है, जो किसानों, खरीदारों और व्यापारियों को जोड़कर उचित दाम और किसानों को सशक्त बनाने का कार्य करता है",
  },
  onboarding: {
    welcomeMessage:
      "कृषि मंडी में आपका स्वागत है! शुरू करने के लिए कृपया अपनी प्रोफ़ाइल पूरी करें।",
    role: "भूमिका",
    farmer: "किसान",
    trader: "व्यापारी",
    contactNumber: "संपर्क नंबर",
    state: "राज्य/केंद्र शासित प्रदेश",
    selectState: "राज्य चुनें",
    district: "जिला",
    pincode: "पिनकोड",
    location: "स्थान",
    detecting: "पता लगाया जा रहा है...",
    detect: "📍 पता लगाएं",
    completeProfile: "प्रोफ़ाइल पूरी करें",
    locationDetectHelp:
      'अपना स्थान स्वचालित रूप से भरने के लिए "📍 पता लगाएं" पर क्लिक करें, या इसे मैन्युअल रूप से दर्ज करें।',
    errorSaving: "प्रोफ़ाइल सेव करने में त्रुटि। कृपया पुनः प्रयास करें।",
    profileCompleted: "प्रोफ़ाइल सफलतापूर्वक पूरी हुई!",
    pleaseWait: "कृपया प्रतीक्षा करें...",
  },
  sell: {
    selectCategory: "श्रेणी चुनें",
    createListing: "लिस्टिंग बनाएं",
    updateListing: "सूची अपडेट करें",
    productDetails: "उत्पाद विवरण",
    productName: "उत्पाद का नाम",
    productNamePlaceholder: "उत्पाद का नाम दर्ज करें",
    description: "विवरण",
    descriptionPlaceholder: "अपने उत्पाद का वर्णन करें",
    pricePerUnit: "प्रति यूनिट कीमत",
    pricePerUnitPlaceholder: "कीमत दर्ज करें",
    unit: "यूनिट",
    selectUnit: "यूनिट चुनें",
    minimumOrder: "न्यूनतम ऑर्डर",
    minimumOrderPlaceholder: "न्यूनतम ऑर्डर मात्रा दर्ज करें",
    locationContactDetails: "स्थान और संपर्क विवरण",
    state: "राज्य",
    selectState: "अपना राज्य चुनें",
    district: "जिला",
    districtPlaceholder: "अपना जिला दर्ज करें",
    contactPhone: "संपर्क फोन नंबर",
    contactPhonePlaceholder: "फोन नंबर दर्ज करें",
    whatsappNumber: "व्हाट्सऐप नंबर",
    whatsappPlaceholder: "व्हाट्सऐप नंबर दर्ज करें",
    sameAsPhone: "फोन नंबर के समान",
    imageUpload: "छवि अपलोड",
    uploadImages: "छवियां अपलोड करें (अधिकतम 3)",
    autoFillLocation: "स्थान विवरण स्वतः भरें",
    detectLocation: "📍 स्थान का पता लगाएं",
    dragDropImages:
      "छवियों को यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें",
    uploading: "अपलोड हो रहा है...",
    listingCreated: "लिस्टिंग सफलतापूर्वक बनाई गई!",
    errorCreating: "लिस्टिंग बनाने में त्रुटि। कृपया पुनः प्रयास करें।",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    requiredField: "यह फ़ील्ड आवश्यक है",
    invalidPrice: "कृपया एक वैध कीमत दर्ज करें",
    invalidPhone: "कृपया एक वैध फोन नंबर दर्ज करें",
    upateDetails: "अपने उत्पाद की सूची को संशोधित करने के लिए नीचे दिए गए विवरण अपडेट करें।",
    createListingForm: "अपनी उत्पाद सूची बनाने के लिए नीचे दिए गए विवरण भरें।",
  },
  profile: {
    myProfile: "मेरी प्रोफ़ाइल",
    personalInformation: "व्यक्तिगत जानकारी",
    role: "भूमिका",
    contactInfo: "संपर्क जानकारी",
    state: "राज्य",
    district: "जिला",
    pincode: "पिनकोड",
    location: "स्थान",
    editProfile: "प्रोफ़ाइल संपादित करें",
    yourListings: "आपकी लिस्टिंग",
    addNewListing: "+ नई लिस्टिंग जोड़ें",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    edit: "संपादित करें",
    delete: "हटाएं",
    noListings: "कोई लिस्टिंग नहीं मिली। अपनी पहली लिस्टिंग बनाकर शुरू करें!",
    confirmDelete: "क्या आप वाकई इस लिस्टिंग को हटाना चाहते हैं?",
    deleteSuccess: "लिस्टिंग सफलतापूर्वक हटाई गई",
    deleteError: "लिस्टिंग हटाने में त्रुटि",
    statusUpdated: "लिस्टिंग स्थिति अपडेट हुई",
    statusError: "स्थिति अपडेट करने में त्रुटि",
  },
  auth: {
    loginTitle: "कृषि मंडी में लॉगिन करें",
    loginSubtitle: "भारत भर के किसानों और व्यापारियों से जुड़ें",
    continueWithGoogle: "Google के साथ जारी रखें",
    signingIn: "साइन इन हो रहा है...",
    loginError: "लॉगिन विफल। कृपया पुनः प्रयास करें।",
    logout: "लॉगआउट",
    loggingOut: "लॉग आउट हो रहा है...",
  },
  language: {
    english: "English",
    hindi: "हिंदी",
    selectLanguage: "भाषा चुनें",
  },
  validation: {
    required: "यह फ़ील्ड आवश्यक है",
    invalidEmail: "कृपया एक वैध ईमेल दर्ज करें",
    invalidPhone: "कृपया एक वैध फोन नंबर दर्ज करें",
    invalidPrice: "कृपया एक वैध कीमत दर्ज करें",
    tooShort: "बहुत छोटा",
    tooLong: "बहुत लंबा",
    invalidFormat: "अमान्य प्रारूप",
  },
  navigation: {
    home: "होम",
    categories: "श्रेणियां",
    listings: "लिस्टिंग",
    profile: "प्रोफ़ाइल",
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    termsConditions: "नियम और शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    faq: "सामान्य प्रश्न",
    backToHome: "होम पर वापस जाएं",
  },
  common: {
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    warning: "चेतावनी",
    info: "जानकारी",
    cancel: "रद्द करें",
    save: "सहेजें",
    submit: "जमा करें",
    close: "बंद करें",
    next: "आगे",
    previous: "पिछला",
    more: "और देखें",
    showLess: "कम दिखाएं",
    tryAgain: "पुनः प्रयास करें",
    retry: "दोबारा कोशिश करें",
    confirm: "पुष्टि करें",
    yes: "हाँ",
    no: "नहीं",
    ok: "ठीक है",
    showingResults: "{{total}} उत्पादों में से {{current}} दिखाए जा रहे हैं",
    loadMore: "और लोड करें ({{remaining}} शेष)",
    endOfListings: "आप लिस्टिंग के अंत तक पहुंच गए हैं",
    noDataFound: "कोई डेटा नहीं मिला",
    somethingWentWrong: "कुछ गलत हुआ",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    processing: "प्रोसेसिंग...",
    postYourAd: "अपना विज्ञापन पोस्ट करें",
    signInMessage: "जारी रखने के लिए Google से साइन इन करें",
    welcome: "स्वागत",
    signInBtn: "Google के साथ जारी रखें",
    freshProduct: "आपके पास ताज़ा उत्पाद",
    freshProductDec:
      "प्रमाणित किसानों और व्यापारियों से सर्वश्रेष्ठ कृषि उत्पाद खोजें",
    chooseFromCategory:
      "वह श्रेणी चुनें जो आपके बेचने वाले उत्पाद का सबसे अच्छा वर्णन करती हो। इससे खरीदारों को आपके उत्पाद आसानी से ढूँढने में मदद मिलेगी।",
    chooseACategory: "श्रेणी चुनें",
    needHelp: "मदद चाहिए?",
    helpType:
      "सही श्रेणी नहीं मिल रही है? सहायता के लिए हमारी सपोर्ट टीम से संपर्क करें।",
    ContactSupport: "सपोर्ट से संपर्क करें",
    categoryNotFound: "श्रेणी नहीं मिली",
    backToCat: "श्रेणियों पर वापस जाएं",
    loadingListingData: "लिस्टिंग डेटा लोड हो रहा है",
    pleaseWaitEditing: "कृपया संपादन के लिए लिस्टिंग लोड होने तक प्रतीक्षा करें।",
    pleaseWaitPrepareForm: "कृपया प्रतीक्षा करें, जबकि हम फॉर्म तैयार कर रहे हैं।",
    listing: "सूची",
    sortedBy: "नवीनतम अनुसार क्रमबद्ध",
  },
  about: {
    heading: "क्रुशी मंडी - एक इवोल फाउंडेशन पहल",

    para1:
      "कृष्णी मंडी किसानों को सीधे व्यापारियों, ख़रीदारों और कृषि व्यवसायों से जोड़ने के लिए बनाया गया एक किसान-पहला डिजिटल प्लेटफ़ॉर्म है। इस पहल का उद्देश्य बिचौलियों को हटाना, उचित मूल्य निर्धारण सुनिश्चित करना और किसानों को वास्तविक ख़रीदारों तक बेहतर पहुंच प्रदान करना है।",
    para2:
      "क्रुशी मंडी पर, किसान अनाज, दालें, बीज, तिलहन, फल, सब्जियां, नट्स, डेयरी, मछली, फूल, चाय और मसाले जैसे उत्पादों की एक विस्तृत श्रृंखला बेच सकते हैं। इसके साथ ही, कृषि उपकरण कंपनियां और उर्वरक आपूर्तिकर्ता भी अपने उत्पादों को सूचीबद्ध कर सकते हैं और एक ही स्थान पर किसानों और व्यापारियों से जुड़ सकते हैं।",
    para3:
      "प्रक्रिया सरल और पारदर्शी है। किसान और व्यापारी बिना किसी अतिरिक्त लेयर या छिपी हुई लागत के सीधे फ़ोन कॉल या व्हाट्सएप के माध्यम से संवाद कर सकते हैं। इससे किसानों को अधिक ख़रीदारों तक पहुंचने और अपनी उपज को सही मूल्य पर बेचने में मदद मिलती है।",
    para4:
      "एवोल फाउंडेशन के स्थिरता और सामाजिक भलाई के मिशन द्वारा समर्थित, क्रुशी मंडी एक डिजिटल कृषि बाज़ार का निर्माण कर रही है जो निष्पक्ष व्यापार का समर्थन करता है, किसानों को सशक्त बनाता है और भारत की ग्रामीण अर्थव्यवस्था को मज़बूत करता है।",
  },
  faqs: {
    heading: "क्रुशी मंडी - अक्सर पूछे जाने वाले प्रश्न (एफएक्यू)",

    q1: "क्रुशी मंडी क्या है?",
    a1: "क्रुशी मंडी एवोल फाउंडेशन द्वारा भारत में एक डिजिटल कृषि बाज़ार है। यह बिचौलियों के बिना किसानों को सीधे ख़रीदारों और व्यापारियों से जोड़ता है। किसान ऑनलाइन फसल बेच सकते हैं, और ख़रीदार आसानी से क्रुशी मंडी ऐप के माध्यम से मेरे आस-पास के स्थानीय किसानों को ढूंढ सकते हैं।",

    q2: "कृष्णी मंडी किसानों और ख़रीदारों के लिए कैसे काम करती है?",
    a2: "किसान अपने उत्पादों को किसानों के लिए ऑनलाइन स्नान पर सूचीबद्ध कर सकते हैं, और ख़रीदार या व्यापारी सीधे फ़ोन कॉल या व्हाट्सएप के माध्यम से उनसे जुड़ सकते हैं। इससे ऑनलाइन सब्जियां ख़रीदना या किसानों से सीधे मेरे पास थोक फल और सब्जियां ख़रीदना आसान हो जाता है।",

    q3: "मैं क्रुशी मंडी पर कौन से उत्पाद ख़रीद या बेच सकता हूं?",
    a3: "मंच अनाज, दालें, बीज, तिलहन, फल, सब्जियां, डेयरी, मछली, फूल, चाय, मसाले और नट्स सहित श्रेणियों की एक विस्तृत श्रृंखला का समर्थन करता है। कृषि उपकरण कंपनियां और उर्वरक आपूर्तिकर्ता भी किसानों के लिए अपने उत्पादों को सूचीबद्ध कर सकते हैं।",

    q4: "क्या मैं अपने आस-पास के किसानों को खोजने के लिए क्रुशी मंडी का उपयोग कर सकता हूं?",
    a4: "हां, क्रुशी मंडी आपको मेरे आस-पास के स्थानीय किसानों से जुड़ने की अनुमति देती है जो सीधे कृषि उपज बेचने के लिए तैयार हैं। इससे ख़रीदारों के लिए किसानों से सीधे उचित क़ीमतों पर ताज़ा उपज ख़रीदना आसान हो जाता है।",

    q5: "क्या किसानों के लिए क्रुषी मंडी मुफ्त है?",
    a5: "हां, किसानों के लिए अपनी फसलों को पंजीकृत करने और सूचीबद्ध करने के लिए क्रुशी मंडी ऐप मुफ्त है। लक्ष्य उचित मूल्य प्रदान करना और किसानों को उच्च कमीशन का भुगतान किए बिना अधिक ख़रीदारों तक पहुंच प्रदान करना है।",

    q6: "कृष्णी मंडी से कौन ख़रीद सकता है?",
    a6: "थोक ख़रीदारों, खुदरा विक्रेताओं, होटल, रेस्तरां और व्यापारियों सहित कोई भी सीधे किसानों से ख़रीद सकता है। मेरे पास थोक सब्जियों या मेरे पास के फलों की तलाश करने वाले व्यवसाय क्रुशी मंडी प्लेटफ़ॉर्म का उपयोग कर सकते हैं।",

    q7: "किसान और व्यापारी कैसे संवाद करते हैं?",
    a7: "संचार फ़ोन कॉल या व्हाट्सएप के माध्यम से सीधा होता है। यह कृष्णी मंडी को एक विश्वसनीय किसान-से-ख़रीदार मंच बनाता है, जिससे दोनों पक्षों को बातचीत करने और जल्दी से सौदों को बंद करने में मदद मिलती है।",

    q8: "कृष्णी मंडी पारंपरिक मंडियों से क्या अलग बनाती है?",
    a8: "भारी बिचौलियों के आरोपों वाली पारंपरिक मंडियों के विपरीत, कृष्णी मंडी किसानों के लिए एक ऑनलाइन स्नान है जहां फसलें सीधे खेत से बाज़ार तक जाती हैं। ख़रीदारों को ताज़ा उपज मिलती है और किसानों को बिना शोषण के उचित मूल्य मिलते हैं।",

    q9: "क्या कृषि उपकरण और उर्वरक कंपनियां क्रुशी मंडी में शामिल हो सकती हैं?",
    a9: "हां, कृष्णी मंडी कृषि उपकरण निर्माताओं और उर्वरक कंपनियों के लिए खुली है जो अपने उत्पादों को सीधे किसानों को दिखाना चाहते हैं।",

    q10: "क्या पूरे भारत में कृष्णी मंडी उपलब्ध है?",
    a10: "हां, क्रुशी मंडी पूरे भारत में सुलभ है। चाहे आप मेरे पास थोक फल और सब्जियों की तलाश कर रहे हों, मेरे पास के स्थानीय किसान, या किसानों के लिए ऑनलाइन स्नान का उपयोग करना चाहते हैं, कृष्णी मंडी सब कुछ एक मंच पर लाता है।",

    q11: "कृष्णी मंडी का मिशन क्या है?",
    a11: "क्रुशी मंडी का मिशन किसानों को सशक्त बनाना, भारत में एक स्थायी कृषि बाज़ार का निर्माण करना, बिचौलियों को कम करना और निष्पक्ष व्यापार के अवसर प्रदान करके ग्रामीण अर्थव्यवस्था को मज़बूत करना है।",
  },
  privacy: {
    heading: "गोपनीयता नीति",
    intro:
      "इवोल फाउंडेशन की एक पहल, कृष्णी मंडी, हमारे उपयोगकर्ताओं की गोपनीयता का सम्मान करती है और उनकी रक्षा करती है। यह गोपनीयता नीति बताती है कि जब आप हमारे प्लेटफ़ॉर्म तक पहुंचते हैं या उपयोग करते हैं तो हम जानकारी कैसे एकत्र करते हैं, संग्रहीत करते हैं और उपयोग करते हैं।",

    section1_title: "1. डेटा जो हम एकत्र करते हैं",
    section1_points_1:
      "पंजीकरण के दौरान प्रदान किए गए मूल उपयोगकर्ता विवरण (उदाहरण के लिए, नाम, फ़ोन नंबर, व्यवसाय प्रकार)।",
    section1_points_2:
      "किसानों, व्यापारियों और कंपनियों द्वारा अपलोड की गई छवियों सहित उत्पाद जानकारी।",

    section2_title: "2. हम डेटा कैसे स्टोर करते हैं",
    section2_points_1:
      "उत्पाद छवियों सहित सभी डेटा, सुपाबेस क्लाउड सर्वर पर सुरक्षित रूप से संग्रहीत किए जाते हैं।",
    section2_points_2:
      "हम अनधिकृत पहुंच से बचाने के लिए मानक सुरक्षा उपायों का उपयोग करते हैं।",

    section3_title: "3. हम डेटा का उपयोग कैसे करते हैं",
    section3_points_1:
      "किसानों को व्यापारियों, ख़रीदारों और कृषि व्यवसायों से जोड़ना।",
    section3_points_2:
      "मंच की कार्यक्षमता और उपयोगकर्ता अनुभव में सुधार करने के लिए।",
    section3_points_3:
      "ख़रीदारों और व्यापारियों के लिए सार्वजनिक रूप से उत्पाद लिस्टिंग प्रदर्शित करने के लिए।",

    section4_title: "4. डेटा साझा करना",
    section4_points_1:
      "हम तीसरे पक्ष को उपयोगकर्ता डेटा नहीं बेचते या किराए पर नहीं देते हैं।",
    section4_points_2:
      "डेटा केवल व्यापार को जोड़ने और पूरा करने के उद्देश्य से ख़रीदारों, व्यापारियों और कंपनियों के साथ साझा किया जा सकता है।",

    section5_title: "5. संपर्क",
    section5_points_1:
      "हमारे मंच का उपयोग करके, आप सहमत हैं कि अन्य पंजीकृत उपयोगकर्ता (किसान, ख़रीदार, व्यापारी) आपकी लिस्टिंग के आधार पर फ़ोन या व्हाट्सएप के माध्यम से आपसे संपर्क कर सकते हैं।",

    section6_title: "6. प्लेटफार्म पर कोई भुगतान नहीं",
    section6_points_1:
      "कृष्णी मंडी किसी भी प्रकार के भुगतान की प्रक्रिया नहीं करती है। सभी लेन-देन सीधे किसानों और ख़रीदारों के बीच होते हैं।",
    section6_points_2:
      "हम ख़रीदारों और विक्रेताओं के बीच किसी भी पूर्व-भुगतान, धोखाधड़ी या विवादों के लिए ज़िम्मेदार नहीं हैं।",

    section7_title: "7. आपके अधिकार",
    section7_points_1:
      "आप हमसे संपर्क करके अपने डेटा या खाते को हटाने का अनुरोध कर सकते हैं।",
    section7_points_2:
      "हम उचित समय के भीतर आपकी जानकारी को अपने सक्रिय डेटाबेस से हटा देंगे।",
  },
  terms: {
    heading: "नियम और शर्तें",
    intro:
      "एवोल फाउंडेशन द्वारा एक मंच, कृष्णी मंडी में आपका स्वागत है। हमारे प्लेटफ़ॉर्म को एक्सेस या उपयोग करके, आप निम्नलिखित नियमों और शर्तों से सहमत होते हैं:",

    section1_title: "1. मंच की प्रकृति",
    section1_points_1:
      "कृष्णी मंडी एक मुफ्त मंच है जो किसानों, व्यापारियों, ख़रीदारों और कृषि व्यवसायों को जोड़ता है।",
    section1_points_2:
      "हम लिस्टिंग, उत्पाद जानकारी और संपर्क विवरण प्रदान करते हैं लेकिन वास्तविक व्यापार में भाग नहीं लेते हैं।",

    section2_title: "2. उपयोगकर्ता की जिम्मेदारियां",
    section2_points_1:
      "उपयोगकर्ता उनके द्वारा अपलोड की गई जानकारी और उत्पाद छवियों की सटीकता के लिए ज़िम्मेदार हैं।",
    section2_points_2:
      "किसानों, व्यापारियों और ख़रीदारों को ख़रीदारी करने से पहले किसी भी उत्पाद की गुणवत्ता, मूल्य और प्रामाणिकता को सीधे सत्यापित करना चाहिए।",

    section3_title: "3. भुगतान और लेनदेन",
    section3_points_1:
      "कृष्णी मंडी कोई भुगतान गेटवे या एस्क्रो सेवा प्रदान नहीं करती है।",
    section3_points_2:
      "प्लेटफ़ॉर्म के बाहर किया गया कोई भी भुगतान केवल ख़रीदार और विक्रेता के बीच होता है।",
    section3_points_3:
      "हम धोखाधड़ी, ग़ैर-डिलीवरी, पूर्व-भुगतान या विवादों के लिए ज़िम्मेदार नहीं हैं।",

    section4_title: "4. सामग्री स्वामित्व",
    section4_points_1:
      "उपयोगकर्ता अपने द्वारा अपलोड की गई सामग्री और उत्पाद छवियों का स्वामित्व बनाए रखते हैं।",
    section4_points_2:
      "सामग्री अपलोड करके, उपयोगकर्ता कृष्णी मंडी को मंच पर सार्वजनिक रूप से सामग्री प्रदर्शित करने और साझा करने का लाइसेंस देते हैं।",

    section5_title: "5. दायित्व की सीमा",
    section5_points_1:
      "कृष्णी मंडी और एवोल फाउंडेशन किसानों, व्यापारियों, ख़रीदारों या कंपनियों के बीच उत्पन्न होने वाले किसी भी वित्तीय नुक़सान, धोखाधड़ी या विवादों के लिए उत्तरदायी नहीं हैं।",
    section5_points_2:
      "हम केवल एक कनेक्टिंग प्लेटफ़ॉर्म के रूप में कार्य करते हैं।",

    section6_title: "6. उपयोग की समाप्ति",
    section6_points_1:
      "हम उन खातों को निलंबित या समाप्त करने का अधिकार सुरक्षित रखते हैं जो प्लेटफ़ॉर्म का दुरुपयोग करते हैं, झूठी जानकारी अपलोड करते हैं, या इन शर्तों का उल्लंघन करते हैं।",

    section7_title: "7. शासी क़ानून",
    section7_points_1:
      "ये शर्तें भारत के क़ानूनों के तहत शासित और व्याख्या की जाएंगी।",
  },
  address: {
    line_1: "105, पी-17, ओंकार सीएचएस लिमिटेड,",
    line_2: "नूपुर नगर माताजी मंदिर,",
    line_3: "मीरा रोड, ठाणे, 401107",
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


