// Marathi glossary for the structured fields that come from the backend
// (condition, ingredients, quantity, frequency, timing, preparation, safety note),
// plus a small Marathi -> English alias table so Marathi search words work with
// the current English search model.
// Anything not found here is shown in its original English form (safe fallback).

const lc = (s) => String(s || "").trim().toLowerCase();

/* ---------------- Conditions ---------------- */
export const CONDITIONS_MR = {
  acidity: "अ‍ॅसिडिटी (पित्त)",
  acne: "मुरुमे",
  anemia: "रक्तक्षय (ॲनिमिया)",
  "angina pectoris": "हृदयशूल (अँजायना)",
  "animal bite": "प्राण्याचा चावा",
  "appetite loss (anorexia)": "भूक न लागणे",
  asthma: "दमा",
  "athlete's foot": "पायाची बुरशी",
  backache: "पाठदुखी",
  "bad odour": "दुर्गंधी",
  baldness: "टक्कल",
  "bed wetting in children": "मुलांचे अंथरुण ओले करणे",
  blackheads: "ब्लॅकहेड्स",
  "bladder stones": "मूत्राशयातील खडे",
  "blood deficiency": "रक्ताची कमतरता",
  "body burns": "शरीर भाजणे",
  "body heat": "अंगातील उष्णता",
  "body pain": "अंगदुखी",
  "body swelling": "अंगावर सूज",
  boils: "गळू / फोड",
  "boils inside ear": "कानातील फोड",
  "breathing problem": "श्वास घेण्यास त्रास",
  "bronchitis in children": "मुलांमधील श्वसननलिकेचा दाह",
  bruises: "मुका मार",
  "burns by hot water": "गरम पाण्याने भाजणे",
  "cataract at early stages": "मोतीबिंदू (सुरुवातीची अवस्था)",
  "chest congestion": "छातीत कफ साचणे",
  "chickenpox in early stage": "कांजिण्या (सुरुवातीची अवस्था)",
  chills: "थंडी वाजणे",
  cold: "सर्दी",
  "cold/cough": "सर्दी / खोकला",
  "colic in babies": "बाळांचा पोटशूळ",
  "constipation for small children": "लहान मुलांची बद्धकोष्ठता",
  "constipation in adults": "प्रौढांची बद्धकोष्ठता",
  cough: "खोकला",
  dandruff: "कोंडा",
  deafness: "बहिरेपणा",
  dehydration: "निर्जलीकरण",
  "delivery of babies": "प्रसूती",
  "dental problems": "दातांच्या समस्या",
  depression: "नैराश्य",
  diabetes: "मधुमेह",
  diarrhea: "जुलाब",
  "diarrhea due to indigestion of food": "अपचनामुळे होणारे जुलाब",
  "ear infection": "कानाचा संसर्ग",
  eczema: "इसब",
  epilepsy: "अपस्मार (फिट्स)",
  "exhaustion due to overwork": "अतिश्रमामुळे थकवा",
  "eye aching": "डोळे दुखणे",
  "eyes having dark circles around them": "डोळ्यांभोवती काळी वर्तुळे",
  "eyesight weakness": "दृष्टी कमजोर होणे",
  fainting: "बेशुद्ध पडणे",
  fatigue: "थकवा",
  "feet / sole having cracks": "पायांना / तळव्यांना भेगा",
  "feet burning": "पायांची जळजळ",
  "feet smelling": "पायांना दुर्गंधी",
  fever: "ताप",
  "fever of unknown origin": "अज्ञात कारणाचा ताप",
  feverishness: "अंगात ताप जाणवणे",
  flatulence: "पोटफुगी / वायू",
  "foot corns": "पायातील घट्टे",
  "for ear pain due to boils use the folowing :":
    "फोडांमुळे होणाऱ्या कानदुखीसाठी",
  "gas problem": "गॅसची समस्या",
  gastroenteritis: "जठर-आंत्रदाह (गॅस्ट्रो)",
  giddiness: "चक्कर येणे",
  "giddiness due to blood pressure": "रक्तदाबामुळे चक्कर येणे",
  "golden rules for gas patients": "गॅसच्या त्रासासाठी सुवर्ण नियम",
  "gouty pains": "संधिवाताच्या वेदना (गाउट)",
  "guidelines of a diabetics diet": "मधुमेहींच्या आहाराची मार्गदर्शक तत्त्वे",
  "hair dullness and coarseness": "केस निस्तेज व राठ होणे",
  "hair falling": "केस गळणे",
  "hair greying": "केस पांढरे होणे",
  "hair loss": "केस गळती",
  "hair thinning": "केस विरळ होणे",
  "head heaviness": "डोके जड वाटणे",
  headache: "डोकेदुखी",
  "headache due to exposure to cold air": "थंड हवेमुळे डोकेदुखी",
  "heart burn": "छातीत जळजळ",
  "heart pain": "हृदयातील वेदना",
  "heart palpitation": "हृदयाची धडधड",
  "heart problem": "हृदयाच्या समस्या",
  "heat exhaustion": "उष्णतेमुळे थकवा",
  "heat stroke": "उष्माघात",
  "heels having pain": "टाचदुखी",
  hepatitis: "यकृतदाह (हिपॅटायटिस)",
  hiccups: "उचकी",
  "high blood pressure": "उच्च रक्तदाब",
  "high cholesterol": "उच्च कोलेस्टेरॉल",
  indigestion: "अपचन",
  "muscular cramps": "स्नायू आखडणे",
  "tired eyes": "थकलेले डोळे",
};

/* ---------------- Ingredients ---------------- */
export const INGREDIENTS_MR = {
  water: "पाणी",
  honey: "मध",
  milk: "दूध",
  ginger: "आले",
  adrak: "आले",
  sugar: "साखर",
  oil: "तेल",
  "sesame oil": "तिळाचे तेल",
  "mustard oil": "मोहरीचे तेल",
  cumin: "जिरे",
  lime: "लिंबू",
  lemon: "लिंबू",
  nimbu: "लिंबू",
  fenugreek: "मेथी",
  turmeric: "हळद",
  haldi: "हळद",
  pepper: "मिरी",
  kalimirach: "काळी मिरी",
  garlic: "लसूण",
  tulsi: "तुळस",
  basil: "तुळस",
  ajwain: "ओवा",
  neem: "कडुनिंब",
  cardamom: "वेलची",
  elaichi: "वेलची",
  cinnamon: "दालचिनी",
  jaggery: "गूळ",
  fennel: "बडीशेप",
  saunf: "बडीशेप",
  ghee: "तूप",
  dhania: "कोथिंबीर / धणे",
  pippali: "पिंपळी",
  "rock salt": "सैंधव मीठ",
  "black salt": "काळे मीठ",
  laung: "लवंग",
  clove: "लवंग",
  anar: "डाळिंब",
  karela: "कारले",
  pyaj: "कांदा",
};

/* ---------------- Preparation / timing / frequency / quantity ---------------- */
const PREPARATION_MR = {
  crushed: "ठेचणे",
  powder: "चूर्ण (पावडर)",
  juice: "रस",
  fried: "भाजणे",
  decoction: "काढा",
  paste: "पेस्ट",
  applied: "लावणे",
  rubbed: "चोळणे",
  mixed: "मिसळणे",
  ground: "वाटणे",
  boil: "उकळणे",
  boiled: "उकळणे",
};

const TIMING_MR = {
  "with water": "पाण्यासोबत",
  "with honey": "मधासोबत",
  "with sugar": "साखरेसोबत",
  "with milk": "दुधासोबत",
  "before meal": "जेवणापूर्वी",
  "before meals": "जेवणापूर्वी",
  "before food": "जेवणापूर्वी",
  "after meals": "जेवणानंतर",
  "after meal": "जेवणानंतर",
  "on empty stomach": "रिकाम्या पोटी",
};

const SAFETY_MR = {
  "traditional home-remedy information only. not medical advice. consult a qualified healthcare professional for diagnosis or treatment.":
    "ही फक्त पारंपरिक घरगुती उपायांची माहिती आहे. हा वैद्यकीय सल्ला नाही. निदान किंवा उपचारासाठी पात्र आरोग्य तज्ज्ञांचा सल्ला घ्या.",
};

const dedupe = (arr) => [...new Set(arr)];

function translateList(value, map) {
  if (!value) return value;
  return dedupe(
    String(value)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => map[lc(x)] || x)
  ).join(", ");
}

function translateFrequencyOne(raw) {
  const s = lc(raw);
  let m;
  if (/^once (a day|daily)$/.test(s)) return "दिवसातून एकदा";
  if (/^(twice (a day|daily)|2 times (a day|daily))$/.test(s)) return "दिवसातून दोन वेळा";
  if (/^(thrice (a day|daily)|3 times (a day|daily))$/.test(s)) return "दिवसातून तीन वेळा";
  if (/^4 times (a day|daily)$/.test(s)) return "दिवसातून चार वेळा";
  if ((m = s.match(/^every (\d+) hours?$/))) return `दर ${m[1]} तासांनी`;
  return raw;
}

function translateQuantityOne(raw) {
  return String(raw)
    .replace(/a pinch/gi, "चिमूटभर")
    .replace(/a handful/gi, "मूठभर")
    .replace(/a piece/gi, "एक तुकडा")
    .replace(/a spoonful/gi, "एक चमचा")
    .replace(/(\d)\s*gm\b/gi, "$1 ग्रॅम")
    .replace(/(\d)\s*ml\b/gi, "$1 मिली")
    .trim();
}

/* ---------------- Public helpers ---------------- */
export function tr(field, value, lang) {
  if (lang !== "mr") return value;
  switch (field) {
    case "condition":
      return CONDITIONS_MR[lc(value)] || value;
    case "ingredients":
      return translateList(value, INGREDIENTS_MR);
    case "preparation":
      return translateList(value, PREPARATION_MR);
    case "timing":
      return translateList(value, TIMING_MR);
    case "frequency":
      return value
        ? dedupe(String(value).split(",").map((x) => translateFrequencyOne(x.trim()))).join(", ")
        : value;
    case "quantity":
      return value
        ? String(value).split(",").map((x) => translateQuantityOne(x)).join(", ")
        : value;
    case "safety":
      return SAFETY_MR[lc(value)] || value;
    default:
      return value;
  }
}

/* ---------------- Marathi search words -> English ---------------- */
// Substring match, so inflected forms like "अपचनावर" or "डोकेदुखीसाठी" are caught.
const SEARCH_ALIASES = [
  ["अपचन", "indigestion"],
  ["डोकेदुखी", "headache"],
  ["डोके दुख", "headache"],
  ["सर्दी", "cold"],
  ["पडसे", "cold"],
  ["खोकला", "cough"],
  ["खोकल्य", "cough"],
  ["ताप", "fever"],
  ["अ‍ॅसिडिटी", "acidity"],
  ["ॲसिडिटी", "acidity"],
  ["ऍसिडिटी", "acidity"],
  ["पित्त", "acidity"],
  ["मुरुम", "acne"],
  ["पिंपल", "acne"],
  ["दमा", "asthma"],
  ["मधुमेह", "diabetes"],
  ["डायबिटीस", "diabetes"],
  ["जुलाब", "diarrhea"],
  ["हगवण", "diarrhea"],
  ["बद्धकोष्ठ", "constipation"],
  ["कोंडा", "dandruff"],
  ["केस गळ", "hair falling"],
  ["टक्कल", "baldness"],
  ["केस पांढर", "hair greying"],
  ["पाठदुखी", "backache"],
  ["पाठ दुख", "backache"],
  ["उचकी", "hiccups"],
  ["कावीळ", "hepatitis"],
  ["उच्च रक्तदाब", "high blood pressure"],
  ["रक्तदाब", "high blood pressure"],
  ["कोलेस्टेरॉल", "high cholesterol"],
  ["नैराश्य", "depression"],
  ["थकवा", "fatigue"],
  ["अशक्तपणा", "fatigue"],
  ["चक्कर", "giddiness"],
  ["उष्माघात", "heat stroke"],
  ["भाजल", "burns"],
  ["भाजणे", "burns"],
  ["गळू", "boils"],
  ["फोड", "boils"],
  ["गॅस", "gas problem"],
  ["वायू", "gas problem"],
  ["पोटफुगी", "flatulence"],
  ["पोटशूळ", "colic"],
  ["रक्तक्षय", "anemia"],
  ["ॲनिमिया", "anemia"],
  ["मूत्राशय", "bladder stones"],
  ["कान", "ear infection"],
  ["डोळ", "eyes"],
  ["दात", "dental problems"],
  ["हृदय", "heart problem"],
  ["छातीत जळजळ", "heart burn"],
  ["भूक", "appetite loss"],
  ["निर्जलीकरण", "dehydration"],
  ["इसब", "eczema"],
  ["बहिरेपण", "deafness"],
  ["श्वास", "breathing problem"],
  ["सूज", "body swelling"],
  ["अंगदुखी", "body pain"],
  ["थंडी वाजणे", "chills"],
];

const hasDevanagari = (s) => /[ऀ-ॿ]/.test(s);

/**
 * If the query contains Marathi words we know, return an English query the
 * search model understands. Otherwise return the query unchanged.
 */
export function toSearchQuery(query) {
  const q = String(query || "").trim();
  if (!hasDevanagari(q)) return q;

  const found = [];
  let rest = q;
  // longest aliases first so "उच्च रक्तदाब" wins over "रक्तदाब"
  [...SEARCH_ALIASES]
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([mr, en]) => {
      if (rest.includes(mr)) {
        if (!found.includes(en)) found.push(en);
        rest = rest.split(mr).join(" ");
      }
    });

  return found.length ? `home remedy for ${found.join(" and ")}` : q;
}
