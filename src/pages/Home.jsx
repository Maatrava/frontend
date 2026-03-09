import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Baby, Bookmark, Heart, Sparkles, TrendingUp } from "lucide-react";
import apiClient from "../api/client";
import { getUserData } from "../auth/token";

export default function Home() {
  const nav = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [user, setUser] = useState(getUserData() || { name: "Mother" });
  const [lastMotherLog] = useState(":no data");
  const [lastBabyLog] = useState(":no data");

  // Removed insightsRef and scrollToInsights for separate page

  useEffect(() => {
    const fetchUserAndArticles = async () => {
      setIsLoadingArticles(true);
      try {
        // Fetch user data
        const userData = await apiClient("/auth/me");
        setUser(userData);

        // Fetch articles from our DB
        const data = await apiClient("/articles");
        setArticles(data);
      } catch (err) {
        console.error("Failed to load data", err);
        setArticles([]);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    fetchUserAndArticles();
  }, []);

  const handleSaveArticle = async (articleId) => {
    try {
      await apiClient("/articles/save", {
        body: { articleId }
      });
      alert("Article saved!");
    } catch (err) {
      alert(err || "Failed to save article");
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 p-2">
      {/* Account for top navbar - add padding */}
      <div className="pt-16">

        {/* Welcome Section with Heading and Description */}
        <section className="bg-[#e6edfc] rounded-3xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Good to see you, {user.name}!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Monitor your recovery and your baby's progress, one day at a time</p>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12">

          {/* Side-Scrolling Articles Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl text-gray-900">
                  <span className="font-bold">Helpful reads</span> <br /> <span className="text-gray-500">for you and your baby</span>
                </h2>
              </div>
              <button
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => alert("View all articles")}
              >
                See all
              </button>
            </div>

            {isLoadingArticles ? (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 border border-gray-200 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-20 mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {articles.map((article) => (
                  <article
                    key={article._id}
                    className="flex-shrink-0 w-64 group bg-white rounded-2xl p-5 hover:shadow-lg transition-all border border-gray-200 border-2 cursor-pointer flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${article.category === "Recovery"
                        ? "bg-pink-100 text-pink-700"
                        : article.category === "Feeding"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-purple-100 text-purple-700"
                        }`}>
                        {article.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveArticle(article._id);
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-pink-600"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div onClick={() => alert(`Opening: ${article.title}`)} className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {article.content}
                      </p>

                      <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900">
                          Read more
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>

                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-sm text-gray-600">No articles available right now</p>
              </div>
            )}
          </section>

          {/* Main Choice: Mother or Baby */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                What would you like to track today?
              </h2>
              <p className="text-sm text-gray-600">
                Choose to log your health or your baby's progress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

              {/* Mother Health Card */}
              <div className="group text-left bg-pink-200 shadow-xl rounded-3xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-xl mb-2">Your Recovery</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Track your postpartum journey.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-600">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Last logged {lastMotherLog}
                  </span>

                  {/* (2) Filled button */}
                  <button
                    onClick={() => nav("/mother")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 text-white text-sm font-semibold shadow-sm hover:bg-pink-700 active:scale-[0.98] transition"
                  >
                    Start logging
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Baby Health Card */}
              <div className="group text-left bg-yellow-100 shadow-xl rounded-3xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
                    <Baby className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-xl mb-2">Baby's Growth</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Monitor your little one's daily patterns.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-600">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Last logged {lastBabyLog}
                  </span>

                  {/* Filled button */}
                  <button
                    onClick={() => nav("/baby")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600 text-white text-sm font-semibold shadow-sm hover:bg-amber-700 active:scale-[0.98] transition"
                  >
                    Start logging
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* AI Health Suggestions */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                Personalized insights
              </h2>
              <p className="text-sm text-gray-600">
                AI-powered guidance based on your journey
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Your Health Assistant
                    </h3>
                    <p className="text-white/90 text-sm mb-4 leading-relaxed">
                      Get personalized insights based on your entries. We'll help you spot patterns, celebrate progress, and know when to check in with your healthcare provider.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-4 py-2 bg-white text-indigo-700 rounded-full text-sm font-semibold hover:bg-white/90 transition"
                        onClick={() => alert("Ask a question")}
                      >
                        Ask a Question
                      </button>
                      <button
                        className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-semibold hover:bg-white/30 transition"
                        onClick={() => nav("/insights")}
                      >
                        View Insights
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Disclaimer */}
          <section className="mb-4">
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Medical Disclaimer</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Maatrava is a health tracking tool and not a substitute for professional medical advice. Always consult your healthcare provider for medical concerns. In emergencies, call your local emergency number immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Scrollbar Hide CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}