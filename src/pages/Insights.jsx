import React from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InsightsDashboard from "../components/InsightsDashboard";

export default function Insights() {
    const nav = useNavigate();

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => nav(-1)}
                            className="p-3 bg-gray-50 text-gray-600 rounded-2xl hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-pink-500" />
                                Overall Health Analytics
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">Comprehensive overview of recovery and development</p>
                        </div>
                    </div>

                    <div className="hidden sm:block">
                        <span className="px-4 py-2 bg-pink-50 text-pink-700 text-xs font-bold uppercase rounded-full tracking-widest border border-pink-100">
                            AI-Powered Insights
                        </span>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <InsightsDashboard />
                </div>

                {/* Footer Insight */}
                <div className="mt-12 p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 flex items-center gap-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="flex-1 relative z-10">
                        <h3 className="font-bold text-lg mb-1">Your data is showing progress!</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">
                            Based on your weekly trends, your baby's sleep duration is stabilizing.
                            Keep logging to get more accurate health pattern detection.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
