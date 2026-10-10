import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const popularSearches = [
    "Indigestion",
    "Headache",
    "Cold",
    "Fever",
  ];

  const searchRemedies = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?query=${encodeURIComponent(
          searchQuery
        )}&top_k=5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch remedies.");
      }

      const data = await response.json();

      setResults(data.results);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to HerbMind backend. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePopularSearch = (item) => {
    const searchText = `home remedy for ${item.toLowerCase()}`;

    setQuery(searchText);
    searchRemedies(searchText);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f3]">

      {/* NAVBAR */}
      <nav className="border-b border-green-100 bg-white/80 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-xl">
              🌿
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-green-900">
                HerbMind
              </h1>

              <p className="text-xs text-gray-500">
                Traditional Remedy Knowledge
              </p>
            </div>

          </div>

          <div className="hidden gap-8 text-sm font-medium text-gray-600 md:flex">

            <a
              href="#home"
              className="hover:text-green-700"
            >
              Home
            </a>

            <a
              href="#about"
              className="hover:text-green-700"
            >
              About
            </a>

            <a
              href="#safety"
              className="hover:text-green-700"
            >
              Safety
            </a>

          </div>

        </div>

      </nav>


      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden"
      >

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">

          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">

              <span>🌱</span>

              <span>
                NLP-Powered Traditional Knowledge
              </span>

            </div>


            <h2 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">

              Discover traditional remedies

              <span className="block text-green-700">
                through intelligent search
              </span>

            </h2>


            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">

              Search documented traditional home-remedy knowledge using
              natural language and discover relevant remedies based on
              semantic meaning.

            </p>


            {/* SEARCH */}
            <div className="mx-auto mt-10 max-w-3xl">

              <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg md:flex-row">

                <div className="flex flex-1 items-center gap-3 px-4">

                  <span className="text-xl">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchRemedies();
                      }
                    }}
                    placeholder="e.g. home remedy for indigestion"
                    className="w-full bg-transparent py-3 text-gray-800 outline-none placeholder:text-gray-400"
                  />

                </div>


                <button
                  onClick={() => searchRemedies()}
                  disabled={loading}
                  className="rounded-xl bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-400"
                >

                  {loading ? "Searching..." : "Search"}

                </button>

              </div>

            </div>


            {/* POPULAR SEARCHES */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

              <span className="text-sm text-gray-500">
                Popular:
              </span>

              {popularSearches.map((item) => (

                <button
                  key={item}
                  onClick={() => handlePopularSearch(item)}
                  className="rounded-full border border-green-200 bg-white px-4 py-2 text-sm text-green-800 transition hover:bg-green-50"
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ERROR */}
      {error && (

        <div className="mx-auto max-w-3xl px-6">

          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">

            {error}

          </div>

        </div>

      )}


      {/* SEARCH RESULTS */}
      {results.length > 0 && (

        <section className="mx-auto max-w-6xl px-6 pb-20">

          <div className="mb-8">

            <p className="text-sm font-medium text-green-700">
              SEARCH RESULTS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">

              Relevant remedies

            </h2>

            <p className="mt-2 text-gray-500">

              Results retrieved using semantic similarity.

            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-2">

            {results.map((remedy) => (

              <div
                key={remedy.remedy_id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* CONDITION */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">

                      {remedy.condition}

                    </span>

                    <h3 className="mt-4 text-xl font-bold text-gray-900">

                      Traditional Remedy

                    </h3>

                  </div>


                  {/* SCORE */}
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-right">

                    <p className="text-xs text-gray-500">
                      Relevance
                    </p>

                    <p className="font-bold text-green-700">
                      {Math.round(remedy.score * 100)}%
                    </p>

                  </div>

                </div>


                {/* INGREDIENTS */}
                <div className="mt-6">

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Ingredients
                  </p>

                  <p className="mt-2 text-gray-700">
                    {remedy.ingredients || "Not specified"}
                  </p>

                </div>


                {/* DETAILS */}
                <div className="mt-5 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-xs font-semibold text-gray-400">
                      Quantity
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {remedy.quantity || "Not specified"}
                    </p>

                  </div>


                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-xs font-semibold text-gray-400">
                      Frequency
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {remedy.frequency || "Not specified"}
                    </p>

                  </div>


                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-xs font-semibold text-gray-400">
                      Timing
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {remedy.timing || "Not specified"}
                    </p>

                  </div>


                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-xs font-semibold text-gray-400">
                      Preparation
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {remedy.preparation || "Not specified"}
                    </p>

                  </div>

                </div>


                {/* REMEDY TEXT */}
                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Remedy
                  </p>

                  <p className="mt-2 leading-7 text-gray-700">
                    {remedy.remedy}
                  </p>

                </div>


                {/* SAFETY */}
                <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">

                  <p className="text-xs font-semibold text-amber-800">
                    ⚠ Safety
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    {remedy.safety_note}
                  </p>

                </div>


                {/* SOURCE */}
                <div className="mt-4 text-xs text-gray-400">

                  Source: {remedy.source}

                </div>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* FEATURES */}
      {results.length === 0 && !loading && (

        <section className="border-y border-gray-100 bg-white">

          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-3">

            <div className="text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl">
                🧠
              </div>

              <h3 className="font-semibold text-gray-900">
                NLP Powered
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Important information is extracted and organized from
                unstructured remedy text.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl">
                🔎
              </div>

              <h3 className="font-semibold text-gray-900">
                Semantic Search
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find relevant remedies according to the meaning of your query.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl">
                🌿
              </div>

              <h3 className="font-semibold text-gray-900">
                Structured Knowledge
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Ingredients, quantities, preparation and other details are
                organized for easier exploration.
              </p>

            </div>

          </div>

        </section>

      )}


      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-20"
      >

        <div className="rounded-3xl bg-green-900 p-10 text-white md:p-14">

          <p className="text-sm font-semibold uppercase tracking-widest text-green-300">
            About HerbMind
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            From traditional knowledge to intelligent retrieval.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-green-100">

            HerbMind transforms documented traditional remedy information
            into structured and semantically searchable knowledge using
            Natural Language Processing, sentence embeddings and similarity
            search.

          </p>

        </div>

      </section>


      {/* SAFETY */}
      <section
        id="safety"
        className="mx-auto max-w-5xl px-6 pb-20"
      >

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <div className="flex gap-4">

            <div className="text-2xl">
              ⚠️
            </div>

            <div>

              <h3 className="font-semibold text-amber-900">
                Important Safety Note
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-800">

                HerbMind presents documented traditional-use information.
                It is not medical advice and does not diagnose conditions
                or prescribe treatment. Consult a qualified healthcare
                professional for medical concerns.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-center text-sm text-gray-500">

          <p>
            © 2026 HerbMind
          </p>

          <p>
            NLP-Based Traditional Remedy Knowledge & Semantic Search System
          </p>

        </div>

      </footer>

    </div>
  );
}

export default App;