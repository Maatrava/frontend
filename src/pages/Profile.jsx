import { useState, useEffect } from "react";
import { User, Mail, Phone, Save, Lock, Globe } from "lucide-react";
import apiClient from "../api/client";
import { getUserData, setUserData } from "../auth/token";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [language, setLanguage] = useState("English");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch profile
                const profile = await apiClient("/user/profile");
                setName(profile.name || "");
                setEmail(profile.email || "");
                setPhone(profile.phone || "");

                // Fetch preferences
                const prefs = await apiClient("/user/preferences");
                if (prefs && prefs.language) {
                    setLanguage(prefs.language);
                }
            } catch (err) {
                setError("Failed to load profile details");
            }
        };
        fetchProfileData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            // Update profile
            const updatePayload = { name, phone };
            if (password) updatePayload.password = password;

            const response = await apiClient("/user/profile", {
                method: "PUT",
                body: updatePayload,
            });

            // Update preferences (language)
            await apiClient("/user/preferences", {
                method: "POST",
                body: { language },
            });

            setUserData({ ...getUserData(), name: response.name });
            setMessage("Profile updated successfully!");
            setPassword(""); // Clear password field after success
        } catch (err) {
            setError(err || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 py-12 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-pink-50 p-8 text-center border-b border-pink-100">
                    <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-pink-200">
                        {name ? name[0].toUpperCase() : "U"}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your account settings</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium flex items-center gap-2 border border-red-100">
                            <span className="w-5 h-5 flex-shrink-0">⚠️</span> {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-2xl mb-6 text-sm font-medium flex items-center gap-2 border border-green-100">
                            <span className="w-5 h-5 flex-shrink-0">✅</span> {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Full Name</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100 transition shadow-sm">
                                    <span className="mr-3 text-gray-400"><User className="w-5 h-5" /></span>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="bg-transparent outline-none w-full text-base"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1 opacity-70">
                                <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Email (Read-only)</label>
                                <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200 cursor-not-allowed">
                                    <span className="mr-3 text-gray-400"><Mail className="w-5 h-5" /></span>
                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        className="bg-transparent outline-none w-full text-base cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Phone Number</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100 transition shadow-sm">
                                    <span className="mr-3 text-gray-400"><Phone className="w-5 h-5" /></span>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="bg-transparent outline-none w-full text-base"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 my-2"></div>

                            {/* Preferred Language */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Preferred Language</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100 transition shadow-sm">
                                    <span className="mr-3 text-gray-400"><Globe className="w-5 h-5" /></span>
                                    <select
                                        className="bg-transparent outline-none w-full text-base appearance-none cursor-pointer"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Bengali">Bengali</option>
                                        <option value="Marathi">Marathi</option>
                                        <option value="Telugu">Telugu</option>
                                        <option value="Tamil">Tamil</option>
                                        <option value="Gujarati">Gujarati</option>
                                        <option value="Urdu">Urdu</option>
                                        <option value="Kannada">Kannada</option>
                                        <option value="Odia">Odia</option>
                                        <option value="Malayalam">Malayalam</option>
                                        <option value="Punjabi">Punjabi</option>
                                    </select>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Change Password</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100 transition shadow-sm">
                                    <span className="mr-3 text-gray-400"><Lock className="w-5 h-5" /></span>
                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep current"
                                        className="bg-transparent outline-none w-full text-base"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 ml-4 mt-1 italic">Only enter if you wish to change your password</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 mt-8 rounded-2xl bg-pink-600 hover:bg-pink-700 transition-all font-bold text-white shadow-lg shadow-pink-100 disabled:bg-pink-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <><Save className="w-5 h-5" /> Save All Changes</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
