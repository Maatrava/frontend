import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, ExternalLink } from "lucide-react";
import apiClient from "../api/client";

export default function Articles() {
    const nav = useNavigate();
    const [articles, setArticles] = useState([]);
    const [savedArticleIds, setSavedArticleIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const data = await apiClient("/articles");
                setArticles(data);

                // Fetch saved IDs
                const savedData = await apiClient("/articles/saved");
                setSavedArticleIds(savedData.map(s => s.articleId));
            } catch (err) {
                console.error("Failed to load articles", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleSaveArticle = async (articleId) => {
        try {
            const response = await apiClient("/articles/save", {
                body: { articleId }
            });
            if (response.saved) {
                setSavedArticleIds(prev => [...prev, articleId]);
            } else {
                setSavedArticleIds(prev => prev.filter(id => id !== articleId));
            }
        } catch (err) {
            alert(err || "Failed to update bookmark");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => nav(-1)}
                            className="p-3 bg-white text-gray-600 rounded-2xl shadow-sm hover:bg-gray-100 transition-colors border border-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Health Resources</h1>
                            <p className="text-gray-500">Curated articles for your journey</p>
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-white rounded-3xl p-6 border border-gray-100 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                                <div className="h-20 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col group h-[400px]"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${article.category === "Recovery"
                                        ? "bg-pink-100 text-pink-700"
                                        : article.category === "Feeding"
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-purple-100 text-purple-700"
                                        }`}>
                                        {article.category}
                                    </span>
                                    <button
                                        onClick={() => handleSaveArticle(article._id)}
                                        className={`p-2 rounded-full transition-colors ${savedArticleIds.includes(article._id)
                                                ? "bg-pink-50 text-pink-600"
                                                : "text-gray-400 hover:bg-gray-50 hover:text-pink-600"
                                            }`}
                                    >
                                        <Bookmark
                                            className="w-5 h-5"
                                            fill={savedArticleIds.includes(article._id) ? "currentColor" : "none"}
                                        />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-5">
                                        {article.content}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                    {article.url ? (
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors gap-2 group/link"
                                        >
                                            Read full article
                                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400 font-medium italic">Full version coming soon</span>
                                    )}
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
