// All visible UI text, in English and Marathi.
// To add another language later, add one more key (e.g. `hi`) with the same fields.

export const LANGUAGES = [
  { code: "en", label: "EN", full: "English" },
  { code: "mr", label: "मराठी", full: "मराठी" },
];

export const STRINGS = {
  en: {
    docTitle: "HerbMind – Traditional Remedy Search",
    brandTag: "Traditional Remedy Knowledge",
    navHome: "Home",
    navAbout: "About",
    navSafety: "Safety",
    languageLabel: "Language",

    badge: "NLP-Powered Traditional Knowledge",
    heroLine1: "Discover traditional remedies",
    heroLine2: "through intelligent search",
    heroSub:
      "Search documented traditional home-remedy knowledge using natural language and discover relevant remedies based on semantic meaning.",
    placeholder: "e.g. home remedy for indigestion",
    searchAria: "Search remedies",
    clearAria: "Clear search",
    search: "Search",
    searching: "Searching…",
    popular: "Popular:",

    errEmpty: "Please enter a search query.",
    errBackend:
      "Unable to connect to HerbMind backend. Make sure FastAPI is running.",

    resultsLabel: "Search results",
    resultsTitle: "Relevant remedies",
    resultsLoading: "Searching the knowledge base…",
    resultsTop: (n, q) =>
      `Top ${n} results for “${q}”, retrieved using semantic similarity.`,
    resultsDefault: "Results are retrieved using semantic similarity.",
    emptyTitle: "No remedies found",
    emptyHint:
      "Try describing the condition differently, for example “remedy for sore throat”.",

    cardTitle: "Traditional Remedy",
    general: "General",
    relevance: "Relevance",
    ingredients: "Ingredients",
    quantity: "Quantity",
    frequency: "Frequency",
    timing: "Timing",
    preparation: "Preparation",
    remedy: "Remedy",
    safety: "Safety",
    source: "Source",
    notSpecified: "Not specified",

    translationNote: "",
    showOriginal: "",
    hideOriginal: "",
    noTranslation: "",

    features: [
      {
        icon: "🧠",
        title: "NLP Powered",
        text: "Important information is extracted and organized from unstructured remedy text.",
      },
      {
        icon: "🔎",
        title: "Semantic Search",
        text: "Find relevant remedies according to the meaning of your query.",
      },
      {
        icon: "🌿",
        title: "Structured Knowledge",
        text: "Ingredients, quantities, preparation and other details are organized for easier exploration.",
      },
    ],

    aboutLabel: "About HerbMind",
    aboutTitle: "From traditional knowledge to intelligent retrieval.",
    aboutText:
      "HerbMind transforms documented traditional remedy information into structured and semantically searchable knowledge using Natural Language Processing, sentence embeddings and similarity search.",

    safetyTitle: "Important Safety Note",
    safetyText:
      "HerbMind presents documented traditional-use information. It is not medical advice and does not diagnose conditions or prescribe treatment. Consult a qualified healthcare professional for medical concerns.",

    footer1: "© 2026 HerbMind",
    footer2: "NLP-Based Traditional Remedy Knowledge & Semantic Search System",
  },

  mr: {
    docTitle: "HerbMind – पारंपरिक उपाय शोध",
    brandTag: "पारंपरिक उपायांचे ज्ञान",
    navHome: "मुख्यपृष्ठ",
    navAbout: "आमच्याबद्दल",
    navSafety: "सुरक्षितता",
    languageLabel: "भाषा",

    badge: "एनएलपी-आधारित पारंपरिक ज्ञान",
    heroLine1: "पारंपरिक घरगुती उपाय शोधा",
    heroLine2: "बुद्धिमान शोधाद्वारे",
    heroSub:
      "नैसर्गिक भाषेत शोधा आणि नोंदवलेल्या पारंपरिक घरगुती उपायांच्या ज्ञानातून अर्थाच्या आधारे संबंधित उपाय मिळवा.",
    placeholder: "उदा. अपचनावर घरगुती उपाय",
    searchAria: "उपाय शोधा",
    clearAria: "शोध पुसून टाका",
    search: "शोधा",
    searching: "शोधत आहे…",
    popular: "लोकप्रिय:",

    errEmpty: "कृपया शोधण्यासाठी काहीतरी लिहा.",
    errBackend:
      "HerbMind सर्व्हरशी संपर्क होऊ शकला नाही. FastAPI चालू असल्याची खात्री करा.",

    resultsLabel: "शोध निकाल",
    resultsTitle: "संबंधित उपाय",
    resultsLoading: "ज्ञानसंग्रहात शोध सुरू आहे…",
    resultsTop: (n, q) =>
      `“${q}” साठी सर्वोत्तम ${n} निकाल, अर्थसाम्याच्या आधारे मिळवलेले.`,
    resultsDefault: "निकाल अर्थसाम्याच्या आधारे मिळवले जातात.",
    emptyTitle: "कोणताही उपाय सापडला नाही",
    emptyHint:
      "आजाराचे वर्णन वेगळ्या शब्दांत करून पाहा, उदा. “अपचनावर उपाय”.",

    cardTitle: "पारंपरिक घरगुती उपाय",
    general: "सामान्य",
    relevance: "समर्पकता",
    ingredients: "साहित्य",
    quantity: "प्रमाण",
    frequency: "किती वेळा",
    timing: "वेळ",
    preparation: "तयार करण्याची पद्धत",
    remedy: "उपाय",
    safety: "सुरक्षितता",
    source: "स्रोत",
    notSpecified: "नमूद नाही",

    translationNote:
      "हे मराठी भाषांतर आहे. प्रमाण किंवा मात्रेबद्दल शंका असल्यास मूळ इंग्रजी मजकूर पाहा.",
    showOriginal: "मूळ इंग्रजी मजकूर पाहा",
    hideOriginal: "मूळ मजकूर लपवा",
    noTranslation: "या उपायाचे मराठी भाषांतर अद्याप उपलब्ध नाही; मूळ इंग्रजी मजकूर दाखवला आहे.",

    features: [
      {
        icon: "🧠",
        title: "एनएलपी-आधारित",
        text: "असंरचित उपायांच्या मजकुरातून महत्त्वाची माहिती काढून ती व्यवस्थित मांडली जाते.",
      },
      {
        icon: "🔎",
        title: "अर्थाधारित शोध",
        text: "तुमच्या प्रश्नाच्या अर्थानुसार संबंधित उपाय शोधले जातात.",
      },
      {
        icon: "🌿",
        title: "सुव्यवस्थित ज्ञान",
        text: "साहित्य, प्रमाण, कृती आणि इतर तपशील सहज शोधता यावेत म्हणून व्यवस्थित मांडले आहेत.",
      },
    ],

    aboutLabel: "HerbMind बद्दल",
    aboutTitle: "पारंपरिक ज्ञानापासून बुद्धिमान शोधापर्यंत.",
    aboutText:
      "HerbMind नोंदवलेली पारंपरिक उपायांची माहिती नैसर्गिक भाषा प्रक्रिया (NLP), वाक्य-एम्बेडिंग्ज आणि साम्य-शोध यांच्या मदतीने सुव्यवस्थित आणि अर्थाधारित शोधता येईल अशा ज्ञानात रूपांतरित करते.",

    safetyTitle: "महत्त्वाची सुरक्षितता सूचना",
    safetyText:
      "HerbMind नोंदवलेली पारंपरिक वापराची माहिती सादर करते. ही वैद्यकीय सल्ला नाही, आजाराचे निदान करत नाही आणि उपचार सुचवत नाही. आरोग्याच्या समस्यांसाठी पात्र आरोग्य तज्ज्ञांचा सल्ला घ्या.",

    footer1: "© 2026 HerbMind",
    footer2: "एनएलपी-आधारित पारंपरिक उपाय-ज्ञान आणि अर्थाधारित शोध प्रणाली",
  },
};

// Popular chips: label is shown in the chosen language,
// `query` is what is sent to the (English) search backend.
export const POPULAR = [
  { query: "indigestion", en: "Indigestion", mr: "अपचन" },
  { query: "headache", en: "Headache", mr: "डोकेदुखी" },
  { query: "cold", en: "Cold", mr: "सर्दी" },
  { query: "fever", en: "Fever", mr: "ताप" },
];
