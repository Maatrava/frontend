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
            } catch (err) {
                setError(String(err) || "Failed to load profile details");
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
                email: formData.email,
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
                email: response.email,
                phone: response.phone || "",
                profilePicture: response.profilePicture || "",
                password: ""
            };
            setFormData(updatedData);
            setOriginalData(updatedData);
            setUserData({
                ...getUserData(),
                name: response.name,
                email: response.email,
                phone: response.phone || "",
                profilePicture: response.profilePicture || ""
            });
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
                        </div>
                        <div className="mb-4">
                            <h1 className="text-3xl font-black text-black drop-shadow-sm">{formData.name || "Your Profile"}</h1>
                            <p className="text-black font-medium opacity-90">{formData.email}</p>
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
                                <div className={`group transition-all duration-300 ${isEditing ? 'bg-gray-50 border-gray-200 focus-within:ring-4 focus-within:ring-pink-50 focus-within:border-pink-300 border rounded-2xl' : 'border-b border-gray-100'}`}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        readOnly={!isEditing}
                                        placeholder="Email Address"
                                        className={`w-full px-4 py-3 bg-transparent outline-none font-bold text-lg ${isEditing ? 'text-gray-900' : 'text-gray-800'}`}
                                    />
                                </div>
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

                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
}
