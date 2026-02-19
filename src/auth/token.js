const getAuthToken = () => localStorage.getItem("token");
const setAuthToken = (token) => localStorage.setItem("token", token);
const clearAuthToken = () => localStorage.removeItem("token");

const setUserData = (user) => localStorage.setItem("user", JSON.stringify(user));
const getUserData = () => JSON.parse(localStorage.getItem("user"));
const clearUserData = () => localStorage.removeItem("user");

export { getAuthToken, setAuthToken, clearAuthToken, setUserData, getUserData, clearUserData };
