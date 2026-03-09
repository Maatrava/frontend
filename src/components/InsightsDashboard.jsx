import React, { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { format } from "date-fns";
import { Baby, Activity, Utensils, Moon, MessageSquare, TrendingUp } from "lucide-react";
import apiClient from "../api/client";

const COLORS = ["#ec4899", "#f59e0b", "#8b5cf6", "#10b981", "#3b82f6"];

export default function InsightsDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const result = await apiClient("/reports/insights");
                setData(result);
            } catch (err) {
                console.error("Failed to fetch insights", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, []);

    if (loading) return <div className="text-center py-10 animate-pulse text-gray-400">Loading insights...</div>;
    if (!data) return null;

    const { summary, motherRecovery, babyGrowth, feeding, sleep, aiUsage } = data;

    return (
        <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <KPICard title="Delivery" value={summary.daysSinceDelivery} unit="days" icon={<Activity className="w-5 h-5" />} color="pink" />
                <KPICard title="Baby Age" value={summary.babyAgeDays} unit="days" icon={<Baby className="w-5 h-5" />} color="amber" />
                <KPICard title="Feedings" value={summary.feedingLogsCount} unit="logs" icon={<Utensils className="w-5 h-5" />} color="orange" />
                <KPICard title="Sleep" value={summary.sleepLogsCount} unit="logs" icon={<Moon className="w-5 h-5" />} color="purple" />
                <KPICard title="AI Help" value={summary.aiQuestionsCount} unit="asks" icon={<MessageSquare className="w-5 h-5" />} color="indigo" />
            </div>

            {/* Main Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Baby Growth Chart */}
                <ChartSection title="Baby Growth Progress" icon={<TrendingUp className="w-5 h-5" />}>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={babyGrowth.history}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="logDate"
                                tickFormatter={(str) => format(new Date(str), "MMM d")}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip labelFormatter={(v) => format(new Date(v), "MMM d, yyyy")} />
                            <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: "#f59e0b" }} />
                            <Line type="monotone" dataKey="height" name="Height (cm)" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartSection>

                {/* Feeding Distribution */}
                <ChartSection title="Feeding Distribution" icon={<Utensils className="w-5 h-5" />}>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={feeding.distribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="count"
                                nameKey="_id"
                            >
                                {feeding.distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartSection>

                {/* AI Activity Timeline */}
                <ChartSection title="AI Assistant Engagement" icon={<MessageSquare className="w-5 h-5" />}>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={aiUsage.activityTimeline}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="count" name="Questions Asked" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartSection>

                {/* Sleep Summary */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                            <Moon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Baby Sleep Pattern</h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-1">
                            {Math.round(sleep.avgDurationMinutes / 60)} hrs
                        </div>
                        <div className="text-sm text-gray-500 mb-6">Average Sleep Duration</div>

                        <div className="space-y-3 text-left">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Sessions</p>
                            {sleep.recentLogs.map((log, i) => (
                                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-700">{format(new Date(log.startTime), "MMM d, h:mm a")}</span>
                                    <span className="font-medium text-purple-600">{Math.round(log.totalDuration / 60)}h {log.totalDuration % 60}m</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function KPICard({ title, value, unit, icon, color }) {
    const colors = {
        pink: "bg-pink-50 text-pink-600",
        amber: "bg-amber-50 text-amber-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
        indigo: "bg-indigo-50 text-indigo-600",
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`p-2 w-fit rounded-lg mb-3 ${colors[color]}`}>
                {icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{title} ({unit})</div>
        </div>
    );
}

function ChartSection({ title, children, icon }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-50 text-gray-600 rounded-xl">
                    {icon}
                </div>
                <h3 className="font-bold text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );
}
