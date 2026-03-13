<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ExternalLink, Bookmark } from "lucide-react";
import apiClient from "../api/client";

export default function SavedArticles() {
    const nav = useNavigate();
    const [savedArticles, setSavedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSavedArticles();
    }, []);

    const fetchSavedArticles = async () => {
        setIsLoading(true);
        try {
            const data = await apiClient("/articles/saved");
            setSavedArticles(data);
        } catch (err) {
            console.error("Failed to load saved articles", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveSaved = async (id) => {
        try {
            await apiClient(`/articles/saved/${id}`, {
                method: "DELETE"
            });
            // Update UI immediately
            setSavedArticles(prev => prev.filter(a => a._id !== id && a.articleId !== id));
        } catch (err) {
            alert(err || "Failed to remove article");
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
                            <h1 className="text-3xl font-bold text-gray-900">Saved Articles</h1>
                            <p className="text-gray-500">Your personal health library</p>
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-white rounded-3xl p-6 border border-gray-100 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                                <div className="h-20 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : savedArticles.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                        <Bookmark className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No saved articles yet</h3>
                        <p className="text-gray-500 mb-6">Articles you bookmark will appear here for easy access.</p>
                        <button
                            onClick={() => nav("/home")}
                            className="px-6 py-2 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-700 transition-colors"
                        >
                            Explore Articles
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {savedArticles.map((article) => (
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
                                        onClick={() => handleRemoveSaved(article._id)}
                                        className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                                        title="Remove from saved"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-5">
                                        {article.description || article.content}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <button
                                        onClick={() => article.url ? window.open(article.url, '_blank') : alert("Full version coming soon")}
                                        className="flex items-center text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors gap-2 group/link"
                                    >
                                        Read more
                                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                    </button>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                        Saved {new Date(article.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
=======
import React, { useEffect, useState } from "react";
import apiClient from "../api/client";

export default function SavedArticles() {
    const [savedArticles, setSavedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                // Assuming /reports/profile returns { savedArticles: [...] }
                const data = await apiClient("/reports/profile");
                setSavedArticles(data.savedArticles || []);
            } catch (err) {
                console.error("Error fetching saved articles", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSaved();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Saved Articles</h1>
                
                {loading ? (
                    <p>Loading...</p>
                ) : savedArticles.length > 0 ? (
                    <div className="grid gap-6">
                        {savedArticles.map((article) => (
                            <div key={article._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <span className="text-xs font-semibold px-2 py-1 bg-pink-100 text-pink-700 rounded-md mb-2 inline-block">
                                    {article.tag}
                                </span>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
                                <p className="text-gray-600 mb-4">{article.desc}</p>
                                <button className="text-pink-600 font-medium hover:underline">Read Article</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-500 mb-4">You haven't saved any articles yet.</p>
                        <a href="/home" className="text-pink-600 font-bold">Go back to explore</a>
>>>>>>> feat/auth-module
                    </div>
                )}
            </div>
        </div>
    );
}
