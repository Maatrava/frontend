import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import ChatWidget from "./pages/ChatWidget";
import ChatHistory from "./pages/ChatHistory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Insights from "./pages/Insights";
import Articles from "./pages/Articles";
import SavedArticles from "./pages/SavedArticles";
import AppLayout from "./layouts/AppLayout";

<<<<<<< HEAD
import PreferredLanguage from "./pages/onBoarding/steps/PreferredLanguage";
=======
>>>>>>> feat/auth-module
import BabyAge from "./pages/onBoarding/steps/BabyAge";
import FeedingMethod from "./pages/onBoarding/steps/Feedingmethod";
import DeliveryType from "./pages/onBoarding/steps/Deliverytype";
import HelpFocus from "./pages/onBoarding/steps/Helpfocus";
import MotherForm from "./pages/MotherForm";
import MotherMainDashboard from "./pages/MotherMainDashboard";
import BabyModule from "./modules/babyModule/pages/BabyModule";
<<<<<<< HEAD
import AppointmentForm from "./pages/AppointmentForm";

=======
import SavedArticles from "./pages/SavedArticles";
>>>>>>> feat/auth-module
function App() {
  return (
    <Routes>
      {/* Public routes (no nav) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />

      <Route path="/onboarding/babyage" element={<BabyAge />} />
      <Route path="/onboarding/feeding" element={<FeedingMethod />} />
      <Route path="/onboarding/delivery" element={<DeliveryType />} />
      <Route path="/onboarding/helpfocus" element={<HelpFocus />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />



      {/* Routes WITH BottomNav */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/mother" element={<MotherMainDashboard />} />
        <Route path="/baby" element={<BabyModule />} />
        <Route path="/mother-main-dashboard" element={<MotherMainDashboard />} />
        <Route path="/mother-form" element={<MotherForm />} />
        <Route path="/appointments" element={<AppointmentForm />} />
        <Route path="/chat" element={<ChatWidget />} />
<<<<<<< HEAD
        <Route path="/chat/history" element={<ChatHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/articles" element={<Articles />} />
=======
>>>>>>> feat/auth-module
        <Route path="/saved-articles" element={<SavedArticles />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
