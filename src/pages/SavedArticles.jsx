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
                    </div>
                )}
            </div>
        </div>
    );
}
