import { useEffect, useRef, useState } from "react";
import { LANGUAGES, POPULAR, STRINGS } from "./i18n/strings";
import { toSearchQuery, tr } from "./i18n/glossary";
import REMEDIES_MR from "./i18n/remedies_mr.json";

const API_URL = "http://127.0.0.1:8000";
const LANG_KEY = "herbmind-lang";

const DETAILS = [
  { key: "quantity", labelKey: "quantity", icon: "⚖️" },
  { key: "frequency", labelKey: "frequency", icon: "🔁" },
  { key: "timing", labelKey: "timing", icon: "⏰" },
  { key: "preparation", labelKey: "preparation", icon: "🥣" },
];

function getInitialLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "mr" ? "mr" : "en";
  } catch {
    return "en";
  }
}

/* ---------------- Language toggle ---------------- */
function LanguageToggle({ lang, setLang, label }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full bg-herb-50 p-1 ring-1 ring-herb-200"
    >
      {LANGUAGES.map(({ code, label: text, full }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={full}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
              active
                ? "bg-herb-700 text-white shadow-sm"
                : "text-herb-800 hover:bg-herb-100"
            }`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Loading placeholder ---------------- */
function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-herb-100 bg-white p-7 shadow-soft">
      <div className="flex justify-between">
        <div className="skeleton h-6 w-28" />
        <div className="skeleton h-10 w-20" />
      </div>
      <div className="skeleton mt-5 h-7 w-48" />
      <div className="skeleton mt-6 h-4 w-24" />
      <div className="skeleton mt-3 h-5 w-2/3" />
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-16" />
        ))}
      </div>
      <div className="skeleton mt-6 h-16 w-full" />
    </div>
  );
}

/* ---------------- Result card ---------------- */
function ResultCard({ remedy, index, lang, t, isSaved, onToggleSave }) {
  const [showOriginal, setShowOriginal] = useState(false);
  const isMr = lang === "mr";

  const percent = Math.max(0, Math.min(100, Math.round(remedy.score * 100)));

  const ingredientsText = tr("ingredients", remedy.ingredients, lang);
  const ingredients = ingredientsText
    ? ingredientsText.split(",").map((i) => i.trim()).filter(Boolean)
    : [];

  // the dataset has some stray control characters from PDF extraction
  const originalText = (remedy.remedy || "").replaceAll("\u0002", " ");
  const marathiText = REMEDIES_MR[String(remedy.remedy_id)];
  const remedyText = isMr && marathiText ? marathiText : originalText;

  return (
    <article
      className="remedy-card animate-fade-up flex flex-col rounded-3xl border border-herb-100 bg-white p-7 shadow-soft"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-herb-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-herb-700 ring-1 ring-herb-100">
            {tr("condition", remedy.condition, lang) || t.general}
          </span>

          <h3 className="font-display mt-4 text-2xl font-semibold text-ink">
            {t.cardTitle}
          </h3>
        </div>

        <div className="min-w-[96px] rounded-2xl bg-herb-50/70 px-4 py-3 text-right ring-1 ring-herb-100">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
            {t.relevance}
          </p>
          <p className="text-xl font-bold text-herb-700">{percent}%</p>
          <div className="score-track mt-2">
            <div className="score-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {t.ingredients}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {ingredients.length > 0 ? (
            ingredients.map((item) => (
              <span
                key={item}
                className="rounded-full border border-herb-200 bg-white px-3 py-1 text-sm font-medium capitalize text-herb-800"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">{t.notSpecified}</span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {DETAILS.map(({ key, labelKey, icon }) => {
          const value = tr(key, remedy[key], lang);
          return (
            <div
              key={key}
              className="rounded-2xl bg-cream/70 p-4 ring-1 ring-black/[0.03]"
            >
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <span aria-hidden="true">{icon}</span>
                {t[labelKey]}
              </p>

              <p
                className={`mt-1.5 text-sm font-medium ${
                  value ? "text-ink" : "text-gray-400"
                }`}
              >
                {value || t.notSpecified}
              </p>
            </div>
          );
        })}
      </div>

      {/* Remedy text */}
      <div className="mt-6 border-t border-herb-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {t.remedy}
        </p>

        <p className="mt-2 leading-7 text-gray-700">{remedyText}</p>

        {isMr && marathiText && (
          <div className="mt-3">
            <p className="text-xs leading-5 text-gray-500">
              {t.translationNote}
            </p>

            <button
              type="button"
              onClick={() => setShowOriginal((v) => !v)}
              aria-expanded={showOriginal}
              className="mt-2 text-sm font-semibold text-herb-700 underline-offset-4 hover:underline"
            >
              {showOriginal ? t.hideOriginal : t.showOriginal}
            </button>

            {showOriginal && (
              <p
                lang="en"
                className="mt-2 rounded-2xl bg-cream/80 p-4 text-sm leading-6 text-gray-600 ring-1 ring-black/[0.04]"
              >
                {originalText}
              </p>
            )}
          </div>
        )}

        {isMr && !marathiText && (
          <p className="mt-2 text-xs leading-5 text-gray-500">
            {t.noTranslation}
          </p>
        )}
      </div>

      {/* Safety */}
      <div className="mt-6 rounded-2xl border border-amber-200/70 bg-amber-50 p-4">
        <p className="text-xs font-semibold text-amber-800">⚠ {t.safety}</p>
        <p className="mt-1 text-xs leading-5 text-amber-800/90">
          {tr("safety", remedy.safety_note, lang)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onToggleSave(remedy)}
          aria-pressed={isSaved}
          className="rounded-full border border-herb-200 px-4 py-2 text-sm font-semibold text-herb-800 transition hover:bg-herb-50"
        >
          {isSaved ? "♥ Saved" : "♡ Save remedy"}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-herb-200 px-4 py-2 text-sm font-semibold text-herb-800 transition hover:bg-herb-50"
        >
          🖨 Print
        </button>

        <button
          type="button"
          onClick={() => {
            const text = `${remedy.condition || "Traditional remedy"}\n\n${remedy.remedy || ""}\n\nShared from HerbMind. Traditional information, not medical advice.`;
            window.open(
              `https://wa.me/?text=${encodeURIComponent(text)}`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="rounded-full border border-herb-200 px-4 py-2 text-sm font-semibold text-herb-800 transition hover:bg-herb-50"
        >
          WhatsApp Share
        </button>
      </div>




      {/* Source */}
      <p className="mt-auto pt-4 text-xs text-gray-400">
        {t.source}: {remedy.source}
      </p>
    </article>
  );
}

function AddRemedyForm({ onClose }) {
  const [form, setForm] = useState({
    contributor: "",
    condition: "",
    ingredients: "",
    remedy: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const submitRemedy = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/remedies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Could not submit remedy.");
      }

      setStatus("success");
      setForm({
        contributor: "",
        condition: "",
        ingredients: "",
        remedy: "",
      });
    } catch (err) {
      setStatus(err.message || "Unable to connect to the backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-remedy-title"
        className="mx-auto my-8 max-w-2xl rounded-3xl bg-white p-6 shadow-lift sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-herb-600">
              Community contributions
            </p>
            <h2 id="add-remedy-title" className="mt-2 text-3xl font-bold text-ink">
              Share a Remedy 🌿
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Share traditional knowledge. Submissions will be reviewed before
              they can appear publicly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-full px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6 rounded-2xl border border-herb-200 bg-herb-50 p-5">
            <h3 className="font-semibold text-herb-900">
              Thank you for contributing!
            </h3>
            <p className="mt-2 text-sm leading-6 text-herb-800">
              Your remedy has been submitted for review. It is not published
              automatically.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-full bg-herb-700 px-5 py-2.5 font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submitRemedy} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Your name (optional)
              </label>
              <input
                name="contributor"
                value={form.contributor}
                onChange={updateField}
                maxLength={80}
                placeholder="e.g. Vaishali"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-herb-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Health concern *
              </label>
              <input
                name="condition"
                required
                maxLength={120}
                value={form.condition}
                onChange={updateField}
                placeholder="e.g. seasonal wellness"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-herb-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Ingredients *
              </label>
              <input
                name="ingredients"
                required
                maxLength={500}
                value={form.ingredients}
                onChange={updateField}
                placeholder="e.g. ginger, water"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-herb-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Remedy and preparation *
              </label>
              <textarea
                name="remedy"
                required
                minLength={10}
                maxLength={3000}
                rows={5}
                value={form.remedy}
                onChange={updateField}
                placeholder="Describe how it is traditionally prepared. Include relevant cautions."
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-herb-500"
              />
            </div>

            <p className="text-xs leading-5 text-amber-800">
              Traditional information only. Do not include dangerous
              instructions or claim that a remedy cures a disease. Submissions
              require review.
            </p>

            {status && (
              <p role="alert" className="text-sm text-red-700">
                {status}
              </p>
            )}

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-gray-200 px-5 py-3 font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-herb-700 px-6 py-3 font-semibold text-white disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit for review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


/* ---------------- App ---------------- */
function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // "empty" | "backend" | ""
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const resultsRef = useRef(null);

  const t = STRINGS[lang];
  const isMr = lang === "mr";

  
const [savedRemedies, setSavedRemedies] = useState(getSavedRemedies);
const [page, setPage] = useState("home");
const [showAddForm, setShowAddForm] = useState(false);

useEffect(() => {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedRemedies));
  } catch (err) {
    console.error("Could not save remedies in this browser:", err);
  }
}, [savedRemedies]);

const toggleSavedRemedy = (remedy) => {
  setSavedRemedies((current) => {
    const exists = current.some(
      (item) => String(item.remedy_id) === String(remedy.remedy_id)
    );

    return exists
      ? current.filter(
          (item) => String(item.remedy_id) !== String(remedy.remedy_id)
        )
      : [...current, remedy];
  });
};


  // keep <html lang>, tab title and saved preference in sync with the toggle
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = STRINGS[lang].docTitle;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage can be unavailable (private mode) – the toggle still works */
    }
  }, [lang]);

  
const SAVED_KEY = "herbmind-saved-remedies";

function getSavedRemedies() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}


  const searchRemedies = async (searchQuery = query, apiQuery) => {
    setPage("home");
    if (!searchQuery.trim()) {
      setError("empty");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);
    setLastQuery(searchQuery.trim());

    // bring the results area into view while loading
    setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      50
    );

    try {
      // Marathi words we know are converted to the English terms the
      // search model understands; anything else is sent as typed.
      const sent = apiQuery || toSearchQuery(searchQuery);

      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(sent)}&top_k=5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch remedies.");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
      setError("backend");
    } finally {
      setLoading(false);
    }
  };

  const handlePopularSearch = (item) => {
    const apiQuery = `home remedy for ${item.query}`;
    const shown = isMr ? item.mr : apiQuery;

    setQuery(shown);
    searchRemedies(shown, apiQuery);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
    setHasSearched(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const errorText =
    error === "empty" ? t.errEmpty : error === "backend" ? t.errBackend : "";

  const navLinks = [
    { href: "#home", label: t.navHome },
    { href: "#about", label: t.navAbout },
    { href: "#safety", label: t.navSafety },
  ];

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-herb-100/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-herb-500 to-herb-800 text-xl shadow-md shadow-herb-700/30">
              🌿
            </div>

            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold leading-tight text-herb-900">
                HerbMind
              </h1>
              <p className="hidden text-xs text-gray-500 sm:block">
                {t.brandTag}
              </p>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden gap-1 text-sm font-medium text-gray-600 sm:flex">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-full px-4 py-2 transition hover:bg-herb-50 hover:text-herb-700"
                >
                  {label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setPage("home");
                setShowAddForm(true);
              }}
              className="rounded-full bg-herb-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-herb-800"
            >
              + Add Your Remedy
            </button>

            <button
              type="button"
              onClick={() => {
                setPage("saved");
                setShowAddForm(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-full border border-herb-200 px-4 py-2 text-sm font-semibold text-herb-800 transition hover:bg-herb-50"
            >
              ♥ Saved ({savedRemedies.length})
            </button>
            

            <LanguageToggle
              lang={lang}
              setLang={setLang}
              label={t.languageLabel}
            />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-bg relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-herb-200 bg-white/80 px-4 py-2 text-sm font-medium text-herb-800 shadow-sm backdrop-blur">
              <span>🌱</span>
              <span>{t.badge}</span>
            </div>

            <h2
              className={`animate-fade-up font-bold text-ink ${
                isMr
                  ? "text-4xl leading-[1.4] md:text-6xl"
                  : "text-5xl leading-[1.08] md:text-7xl"
              }`}
              style={{ animationDelay: "80ms" }}
            >
              {t.heroLine1}
              <span className="text-gradient block">{t.heroLine2}</span>
            </h2>

            <p
              className="animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600"
              style={{ animationDelay: "160ms" }}
            >
              {t.heroSub}
            </p>

            {/* SEARCH */}
            <form
              className="animate-fade-up mx-auto mt-10 max-w-3xl"
              style={{ animationDelay: "240ms" }}
              onSubmit={(e) => {
                e.preventDefault();
                searchRemedies();
              }}
              role="search"
            >
              <div className="search-box flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-3 shadow-lift md:flex-row">
                <div className="flex flex-1 items-center gap-3 px-4">
                  <span className="text-xl" aria-hidden="true">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.placeholder}
                    aria-label={t.searchAria}
                    className="w-full bg-transparent py-3 text-lg text-ink outline-none placeholder:text-gray-400"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label={t.clearAria}
                      className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-gradient-to-b from-herb-600 to-herb-800 px-9 py-3.5 font-semibold text-white shadow-md shadow-herb-800/30 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? t.searching : t.search}
                </button>
              </div>
            </form>

            {/* POPULAR SEARCHES */}
            <div
              className="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <span className="text-sm text-gray-500">{t.popular}</span>

              {POPULAR.map((item) => (
                <button
                  key={item.query}
                  onClick={() => handlePopularSearch(item)}
                  className="rounded-full border border-herb-200 bg-white/90 px-4 py-2 text-sm font-medium text-herb-800 transition hover:-translate-y-0.5 hover:border-herb-400 hover:bg-herb-50 hover:shadow-md"
                >
                  {item[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {errorText && (
        <div className="mx-auto max-w-3xl px-6 pt-8" role="alert">
          <div className="animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
            {errorText}
          </div>
        </div>
      )}

      {/* RESULTS AREA */}
      <div ref={resultsRef}>
        {hasSearched && (
          <section className="mx-auto max-w-6xl px-6 pb-20 pt-14">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-herb-600">
                {t.resultsLabel}
              </p>

              <h2 className="mt-2 text-4xl font-bold text-ink">
                {t.resultsTitle}
              </h2>

              <p className="mt-2 text-gray-500">
                {loading
                  ? t.resultsLoading
                  : results.length > 0
                  ? t.resultsTop(results.length, lastQuery)
                  : t.resultsDefault}
              </p>
            </div>

            {loading && (
              <div className="grid gap-6 md:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {results.map((remedy, i) => (
                  
                  <ResultCard
                    key={remedy.remedy_id}
                    remedy={remedy}
                    index={i}
                    lang={lang}
                    t={t}
                    isSaved={savedRemedies.some(
                      (item) => String(item.remedy_id) === String(remedy.remedy_id)
                    )}
                    onToggleSave={toggleSavedRemedy}
                  />

                ))}
              </div>
            )}

            {!loading && !error && results.length === 0 && (
              <div className="rounded-3xl border border-dashed border-herb-200 bg-white/60 p-12 text-center">
                <p className="text-4xl">🍃</p>
                <h3 className="font-display mt-3 text-xl font-semibold">
                  {t.emptyTitle}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{t.emptyHint}</p>
              </div>
            )}
          </section>
        )}
      </div>

      {page === "saved" && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-herb-600">
            Your personal collection
          </p>

          <h2 className="mt-2 text-4xl font-bold text-ink">
            My Remedy Box ♥
          </h2>

          <p className="mt-2 text-gray-500">
            Your saved remedies stay in this browser, even after refreshing.
          </p>

          {savedRemedies.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-herb-200 bg-white p-12 text-center">
              <p className="text-4xl">🍃</p>
              <h3 className="mt-3 text-xl font-semibold">
                Your box is empty
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Search for remedies and tap ♡ Save remedy to add them here.
              </p>
              <button
                type="button"
                onClick={() => setPage("home")}
                className="mt-5 rounded-full bg-herb-700 px-5 py-3 font-semibold text-white"
              >
                Explore remedies
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {savedRemedies.map((remedy, i) => (
                <ResultCard
                  key={remedy.remedy_id}
                  remedy={remedy}
                  index={i}
                  lang={lang}
                  t={t}
                  isSaved
                  onToggleSave={toggleSavedRemedy}
                />
              ))}
            </div>
          )}
        </section>
      )}
      

      {/* FEATURES */}
      {!hasSearched && (
        <section className="border-y border-herb-100 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
            {t.features.map((feature, i) => (
              <div
                key={feature.icon}
                className="animate-fade-up rounded-3xl border border-herb-100 bg-cream/60 p-8 text-center transition hover:-translate-y-1 hover:shadow-soft"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-herb-100">
                  {feature.icon}
                </div>

                <h3 className="font-display text-lg font-semibold text-ink">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-herb-800 to-herb-900 p-10 text-white md:p-14">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 text-[12rem] leading-none opacity-10"
          >
            🌿
          </div>

          <p className="relative text-sm font-semibold uppercase tracking-widest text-herb-300">
            {t.aboutLabel}
          </p>

          <h2 className="relative mt-4 text-3xl font-bold md:text-4xl">
            {t.aboutTitle}
          </h2>

          <p className="relative mt-5 max-w-3xl leading-8 text-herb-100">
            {t.aboutText}
          </p>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
          <div className="flex gap-4">
            <div className="text-2xl" aria-hidden="true">
              ⚠️
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-amber-900">
                {t.safetyTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                {t.safetyText}
              </p>
            </div>
          </div>
        </div>
      </section>
      {showAddForm && (
        <AddRemedyForm onClose={() => setShowAddForm(false)} />
      )}
      {/* FOOTER */}
      <footer className="border-t border-herb-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-center text-sm text-gray-500">
          <p>{t.footer1}</p>
          <p>{t.footer2}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
