import { useState, useEffect } from "react";
import { User, Mail, Phone, Save, Lock, Edit2, X, Camera } from "lucide-react";
import apiClient from "../api/client";
import { getUserData, setUserData } from "../auth/token";

export default function Profile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        profilePicture: "",
        password: ""
    });
    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profile = await apiClient("/user/profile");
                const userData = {
                    name: profile.name || "",
                    email: profile.email || "",
                    phone: profile.phone || "",
                    profilePicture: profile.profilePicture || "",
                    password: ""
                };
                setFormData(userData);
                setOriginalData(userData);
            } catch {
                setError("Failed to load profile details");
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validatePhone = (phone) => {
        if (!phone) return true;
        // Basic pattern: optional +, then at least 10 digits/spaces/dashes
        return /^\+?[\d\s-]{10,}$/.test(phone);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setMessage("");
        setError("");
    };

    const handleCancel = () => {
        setFormData(originalData);
        setIsEditing(false);
        setError("");
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!formData.name.trim()) {
            setError("Name cannot be empty");
            return;
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            setError("Invalid phone number format");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");
        try {
            const updatePayload = {
                name: formData.name,
                phone: formData.phone,
                profilePicture: formData.profilePicture
            };
            if (formData.password) updatePayload.password = formData.password;

            const response = await apiClient("/user/profile", {
                method: "PUT",
                body: updatePayload,
            });

            const updatedData = {
                ...formData,
                name: response.name,
                phone: response.phone || "",
                profilePicture: response.profilePicture || "",
                password: ""
            };
            setFormData(updatedData);
            setOriginalData(updatedData);
            setUserData({ ...getUserData(), name: response.name });
            setMessage("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            setError(err || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const userInitial = formData.name ? formData.name[0].toUpperCase() : "U";

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Section */}
                <div className="relative h-48 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400">
                    <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                        <div className="relative group">
                            {formData.profilePicture ? (
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white transition-transform group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-pink-500 text-4xl font-black border-4 border-white shadow-xl">
                                    {userInitial}
                                </div>
                            )}
                            {isEditing && (
                                <div className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-xl shadow-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all hover:scale-110 active:scale-95 group">
                                    <Camera className="w-5 h-5 text-gray-600 group-hover:text-pink-500" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <h1 className="text-3xl font-black text-white drop-shadow-sm">{formData.name || "Your Profile"}</h1>
                            <p className="text-pink-50 font-medium opacity-90">{formData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-24 pb-8 px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Personal Account</h2>
                            <p className="text-gray-500 text-sm font-medium">Manage your personal information and profile settings</p>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="bg-pink-50 text-pink-600 px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-pink-100 transition-all self-start md:self-center"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-50 text-gray-600 px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-all"
                                >
                                    <X className="w-4 h-4" /> Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-pink-600 text-white px-8 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <><Save className="w-4 h-4" /> Save Changes</>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-top-4">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">⚠️</div>
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-3 border border-green-100 animate-in fade-in slide-in-from-top-4">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">✅</div>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Left Column: Essential Info */}
                        <div className="space-y-6">
                            <div className="space-y-1.5 px-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Full Name
                                </label>
                                <div className={`group transition-all duration-300 ${isEditing ? 'bg-gray-50 border-gray-200 focus-within:ring-4 focus-within:ring-pink-50 focus-within:border-pink-300 border rounded-2xl' : 'border-b border-gray-100'}`}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        placeholder="Full Name"
                                        className={`w-full px-4 py-3 bg-transparent outline-none font-bold text-lg ${isEditing ? 'text-gray-900' : 'text-gray-800'}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 px-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Email Address
                                </label>
                                <div className="border-b border-gray-100">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        readOnly
                                        className="w-full px-4 py-3 bg-transparent outline-none font-bold text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 px-4 mt-1 font-medium italic">Email cannot be changed contact support if needed</p>
                            </div>

                            <div className="space-y-1.5 px-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" /> Phone Number
                                </label>
                                <div className={`group transition-all duration-300 ${isEditing ? 'bg-gray-50 border-gray-200 focus-within:ring-4 focus-within:ring-pink-50 focus-within:border-pink-300 border rounded-2xl' : 'border-b border-gray-100'}`}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        placeholder="Add phone number"
                                        className={`w-full px-4 py-3 bg-transparent outline-none font-bold text-lg ${isEditing ? 'text-gray-900' : 'text-gray-800'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Profile & Security */}
                        <div className="space-y-6">
                            {isEditing ? (
                                <>
                                    <div className="space-y-1.5 px-1">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Camera className="w-3.5 h-3.5" /> Profile Image URL
                                        </label>
                                        <div className="bg-gray-50 border border-gray-200 rounded-2xl focus-within:ring-4 focus-within:ring-pink-50 focus-within:border-pink-300 transition-all duration-300">
                                            <input
                                                type="text"
                                                name="profilePicture"
                                                value={formData.profilePicture}
                                                onChange={handleChange}
                                                placeholder="https://images.unsplash.com/..."
                                                className="w-full px-4 py-3 bg-transparent outline-none font-bold text-gray-900"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 px-1">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Lock className="w-3.5 h-3.5" /> Change Password
                                        </label>
                                        <div className="bg-gray-50 border border-gray-200 rounded-2xl focus-within:ring-4 focus-within:ring-pink-50 focus-within:border-pink-300 transition-all duration-300">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full px-4 py-3 bg-transparent outline-none font-bold text-gray-900"
                                            />
                                        </div>
                                        <p className="text-[10px] text-gray-400 px-4 mt-1 font-medium italic">Leave blank to keep your current secure password</p>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col justify-center">
                                    <div className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-[2.5rem] border border-pink-100/50">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                                            <Lock className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <h3 className="text-lg font-black text-pink-900 mb-2">Account Security</h3>
                                        <p className="text-sm text-pink-700/80 leading-relaxed font-medium">
                                            Your account is protected by industry-standard encryption.
                                            We never share your private data with third parties.
                                        </p>
                                        <div className="mt-6 pt-6 border-t border-pink-200/50 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-xs font-bold text-pink-800 uppercase tracking-tighter">Verified Account</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Help/Support Section */}
            {!isEditing && (
                <div className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-1">Need help with your account?</h3>
                        <p className="text-gray-400 font-medium">Our support team is available 24/7 to assist you with any issues.</p>
                    </div>
                    <button className="relative z-10 bg-white text-gray-900 px-8 py-3 rounded-2xl font-black hover:bg-gray-100 transition-all active:scale-95 flex-shrink-0">
                        Contact Support
                    </button>
                </div>
            )}
        </div>
    );
}
