import { useState, useEffect } from "react";
import { User, Mail, Phone, Save } from "lucide-react";
import apiClient from "../api/client";
import { getUserData, setUserData } from "../auth/token";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiClient("/user/profile");
                setName(data.name || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
            } catch (err) {
                setError("Failed to load profile");
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await apiClient("/user/profile", {
                method: "PUT",
                body: { name, phone },
            });
            setUserData({ ...getUserData(), name: response.name });
            setMessage("Profile updated successfully!");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-4">Full Name</label>
                    <div className="flex items-center bg-amber-50 rounded-full px-4 py-3 border border-transparent focus-within:border-amber-200 transition">
                        <span className="mr-3 text-gray-400"><User className="w-5 h-5" /></span>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="bg-transparent outline-none w-full text-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-4">Email (Read-only)</label>
                    <div className="flex items-center bg-gray-50 rounded-full px-4 py-3 opacity-70">
                        <span className="mr-3 text-gray-400"><Mail className="w-5 h-5" /></span>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="bg-transparent outline-none w-full text-sm cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-4">Phone Number</label>
                    <div className="flex items-center bg-amber-50 rounded-full px-4 py-3 border border-transparent focus-within:border-amber-200 transition">
                        <span className="mr-3 text-gray-400"><Phone className="w-5 h-5" /></span>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="bg-transparent outline-none w-full text-sm"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-pink-200 hover:bg-pink-300 transition font-bold text-gray-800 shadow-md disabled:bg-gray-200 flex items-center justify-center gap-2"
                >
                    {loading ? "Saving..." : <><Save className="w-5 h-5" /> Save Changes</>}
                </button>
            </form>
        </div>
    );
}
