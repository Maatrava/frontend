import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import ChatWidget from "./pages/ChatWidget";
import AppLayout from "./layouts/AppLayout";
import PreferredLanguage from "./pages/onBoarding/steps/PreferredLanguage";
import BabyAge from "./pages/onBoarding/steps/BabyAge";
import FeedingMethod from "./pages/onBoarding/steps/Feedingmethod";
import DeliveryType from "./pages/onBoarding/steps/Deliverytype";
import HelpFocus from "./pages/onBoarding/steps/Helpfocus";
import MotherForm from "./pages/MotherForm";
import MotherMainDashboard from "./pages/MotherMainDashboard";
import BabyModule from "./modules/babyModule/pages/BabyModule";
function App() {
  return (
    <Routes>
      {/* Public routes (no nav) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/onboarding/language" element={<PreferredLanguage />} />
      <Route path="/onboarding/babyage" element={<BabyAge />} />
      <Route path="/onboarding/feeding" element={<FeedingMethod />} />
      <Route path="/onboarding/delivery" element={<DeliveryType />} />
      <Route path="/onboarding/helpfocus" element={<HelpFocus />} />


      {/* Routes WITH BottomNav */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/mother" element={<MotherMainDashboard />} />
        <Route path="/baby" element={<BabyModule />} />
        <Route path="/mother-main-dashboard" element={<MotherMainDashboard />} />
        <Route path="/mother-form" element={<MotherForm />} />
        <Route path="/chat" element={<ChatWidget />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
