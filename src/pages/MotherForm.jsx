import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  HeartPulse,
  Brain,
  Baby,
  ClipboardList,
  CalendarClock,
} from "lucide-react";
import apiClient from "../api/client";
import PrimaryButton from "../components/PrimaryButton.jsx";

const STORAGE_KEY = "maatrava.motherForm.v1";

const emptyMotherForm = {
  // mom info
  fullName: "",
  personalName: "",
  husbandName: "",
  motherContact: "",
  husbandContact: "",
  age: "",
  dob: "",
  bloodGroup: "",
  height: "",
  weight: "",
  medicineAllergy: "",
  emergencyContact1: "",
  emergencyContact2: "",

  // delivery details
  deliveryDate: "",
  deliveryTime: "",
  deliveryPlace: "",
  deliveryMode: "",
  deliveryDuration: "",
  deliveryComplications: "",

  // postnatal health
  bp: "",
  hemoglobin: "",
  bloodSugar: "",
  temperature: "",
  pulse: "",
  bleeding: "",
  painLevel: "",

  // med history
  preExistingConditions: "",
  pregnancyComplications: "",
  medications: "",
  allergies: "",

  // mental & emotional health
  mood: "",
  postpartumDepressionSigns: "",
  emotionalSupport: "",

  // breastfeeding & recovery
  breastfeedingStarted: "",
  breastfeedingIssues: "",
  appetite: "",
  sleep: "",
  bowelUrinary: "",

  // follow-up & discharge
  doctorNotes: "",
  careInstructions: "",
  nextFollowUp: "",
  dischargeDate: "",
};

const SECTION_FIELDS = {
  personal: [
    "personalName",
    "husbandName",
    "motherContact",
    "husbandContact",
    "age",
    "dob",
    "bloodGroup",
    "height",
    "weight",
    "medicineAllergy",
    "foodAllergy",
    "emergencyContact1",
    "emergencyContact2",
  ],
  delivery: [
    "deliveryDate",
    "deliveryTime",
    "deliveryPlace",
    "deliveryMode",
    "deliveryDuration",
    "deliveryComplications",
  ],
  postnatal: [
    "bp",
    "hemoglobin",
    "bloodSugar",
    "temperature",
    "pulse",
    "bleeding",
    "painLevel",
  ],
  mental: [
    "mood",
    "postpartumDepressionSigns",
    "emotionalSupport",
  ],
  breastfeeding: [
    "breastfeedingStarted",
    "breastfeedingIssues",
    "appetite",
    "sleep",
    "bowelUrinary",
  ],
  medical: [
    "preExistingConditions",
    "pregnancyComplications",
    "medications",
    "allergies",
  ],
  followup: [
    "doctorNotes",
    "careInstructions",
    "nextFollowUp",
    "dischargeDate",
  ],
};

function safeParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-3 mb-1.5">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          "w-full h-12 rounded-2xl px-4 text-sm",
          "bg-white border border-gray-200 text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        ].join(" ")}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, placeholder, disabled }) {
  return (
    <label className="block">
      <div className="mb-1.5">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          "w-full h-12 rounded-2xl px-4 text-sm",
          "bg-white border border-gray-200 text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        ].join(" ")}
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder, disabled, rows = 4 }) {
  return (
    <label className="block">
      <div className="mb-1.5">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={[
          "w-full rounded-2xl px-4 py-3 text-sm",
          "bg-white border border-gray-200 text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        ].join(" ")}
      />
    </label>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children, onEdit, onReset, isEditing }) {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="w-9 h-9 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
              <Icon className="w-5 h-5" />
            </div>
          ) : null}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {title}
            </h2>
            {subtitle ? (
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-3 py-1.5 rounded-full bg-pink-600 text-white text-xs font-semibold shadow-sm hover:bg-pink-700 active:scale-95 transition"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {children}
    </section>
  );
}

export default function MotherForm() {
  const nav = useNavigate();
  const [form, setForm] = useState(emptyMotherForm);
  const [savedData, setSavedData] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  // navigates to main dashboard
  const handleBlueBoxClick = () => {
    nav("/mother-main-dashboard"); 
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? safeParseJson(raw) : null;
    const merged = parsed && typeof parsed === "object"
      ? { ...emptyMotherForm, ...parsed }
      : emptyMotherForm;
    setForm(merged);
    setSavedData(merged);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (message, variant = "success") => {
    setToast({ message, variant });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  };

  const setField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSectionEditToggle = (key) => {
    setEditingSection((current) => (current === key ? null : key));
  };

  const handleSectionReset = (key) => {
    const fields = SECTION_FIELDS[key] || [];
    setForm((prev) => {
      const base = savedData || emptyMotherForm;
      const updated = { ...prev };
      fields.forEach((f) => {
        updated[f] = base[f] ?? emptyMotherForm[f];
      });
      return updated;
    });
    showToast("Section reset to last saved values.", "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const payload = { ...form };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedData(payload);

      try {
        await apiClient("/mother-form", { body: payload });
      } catch {
        // backend call 
      }

      setEditingSection(null);
      showToast("Mother dashboard updated.", "success");
    } finally {
      setIsSaving(false);
    }
  };

  const isSectionEditing = (key) => editingSection === key;

  const tabs = [
    { key: "personal", label: "Personal Info" },
    { key: "delivery", label: "Delivery Details" },
    { key: "postnatal", label: "Postnatal Health" },
    { key: "mental", label: "Mental & Emotional" },
    { key: "breastfeeding", label: "Breastfeeding & Recovery" },
    { key: "medical", label: "Medical History" },
    { key: "followup", label: "Follow-Up & Discharge" },
  ];

  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <header className="space-y-4">
            {/* blue box - click to go to main dashboard */}
            <div 
              onClick={handleBlueBoxClick} 
              className="bg-[#e6edfc] rounded-3xl px-5 sm:px-6 py-6 flex items-center justify-between cursor-pointer hover:bg-[#d8e3fa] transition-colors">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Mother Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
                  Welcome mommy! You're doing great every single day!!
                </p>
              </div>
              
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-200 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
              </div>
            </div>

            {/* nav tab */}
            <nav className="bg-gray-100 rounded-3xl border border-gray-200 shadow-sm px-3 py-2 scrollbar-hide overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={[
                      "px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition",
                      activeTab === tab.key
                        ? "bg-pink-600 text-white shadow-sm"
                        : "bg-white text-gray-700 hover:bg-gray-100",
                    ].join(" ")} >
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === "personal" && (
              <SectionCard
                title="Personal Info"
                subtitle="Basic details about you and your family."
                icon={User}
                onEdit={() => handleSectionEditToggle("personal")}
                onReset={() => handleSectionReset("personal")}
                isEditing={isSectionEditing("personal")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Mother's Name"
                    value={form.personalName}
                    onChange={setField("personalName")}
                    placeholder="Your full name"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Husband's Name"
                    value={form.husbandName}
                    onChange={setField("husbandName")}
                    placeholder="Partner's full name"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Mother's Contact"
                    value={form.motherContact}
                    onChange={setField("motherContact")}
                    placeholder="Your phone number"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Husband's Contact"
                    value={form.husbandContact}
                    onChange={setField("husbandContact")}
                    placeholder="Partner's phone number"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Age"
                    type="number"
                    value={form.age}
                    onChange={setField("age")}
                    placeholder="Your age"
                    disabled={!isSectionEditing("personal")}/>
                  <Field
                    label="Blood Group"
                    value={form.bloodGroup}
                    onChange={setField("bloodGroup")}
                    placeholder="e.g., O+"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Height"
                    value={form.height}
                    onChange={setField("height")}
                    placeholder="e.g., 160 cm"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Weight"
                    value={form.weight}
                    onChange={setField("weight")}
                    placeholder="e.g., 60 kg"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Medicine Allergy"
                    value={form.medicineAllergy}
                    onChange={setField("medicineAllergy")}
                    placeholder="Any medicine allergies"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Food Allergy"
                    value={form.foodAllergy}
                    onChange={setField("foodAllergy")}
                    placeholder="Any food allergies"
                    disabled={!isSectionEditing("personal")} />
                  <Field
                    label="Emergency Contact 1"
                    value={form.emergencyContact1}
                    onChange={setField("emergencyContact1")}
                    placeholder="Primary emergency contact"
                    disabled={!isSectionEditing("personal")}  />
                  <Field
                    label="Emergency Contact 2"
                    value={form.emergencyContact2}
                    onChange={setField("emergencyContact2")}
                    placeholder="Secondary emergency contact"
                    disabled={!isSectionEditing("personal")} />
                </div>
              </SectionCard>
            )}

            {activeTab === "delivery" && (
              <SectionCard
                title="Delivery Details"
                subtitle="Basic information about your delivery."
                icon={Baby}
                onEdit={() => handleSectionEditToggle("delivery")}
                onReset={() => handleSectionReset("delivery")}
                isEditing={isSectionEditing("delivery")} >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Date"
                    type="date"
                    value={form.deliveryDate}
                    onChange={setField("deliveryDate")}
                    disabled={!isSectionEditing("delivery")} />
                  <Field
                    label="Time"
                    type="time"
                    value={form.deliveryTime}
                    onChange={setField("deliveryTime")}
                    disabled={!isSectionEditing("delivery")} />
                  <Field
                    label="Place"
                    value={form.deliveryPlace}
                    onChange={setField("deliveryPlace")}
                    placeholder="Hospital / Clinic / Home"
                    disabled={!isSectionEditing("delivery")}/>
                  <Field
                    label="Mode"
                    value={form.deliveryMode}
                    onChange={setField("deliveryMode")}
                    placeholder="e.g., Normal, C-Section"
                    disabled={!isSectionEditing("delivery")} />
                  <Field
                    label="Duration"
                    value={form.deliveryDuration}
                    onChange={setField("deliveryDuration")}
                    placeholder="e.g., 6 hours"
                    disabled={!isSectionEditing("delivery")} />
                  <Field
                    label="Complications"
                    value={form.deliveryComplications}
                    onChange={setField("deliveryComplications")}
                    placeholder="Optional"
                    disabled={!isSectionEditing("delivery")}/>
                </div>
              </SectionCard>
            )}

            {activeTab === "postnatal" && (
              <SectionCard
                title="Postnatal Health"
                subtitle="Key vitals and physical health."
                icon={HeartPulse}
                onEdit={() => handleSectionEditToggle("postnatal")}
                onReset={() => handleSectionReset("postnatal")}
                isEditing={isSectionEditing("postnatal")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="BP"
                    value={form.bp}
                    onChange={setField("bp")}
                    placeholder="e.g., 120/80"
                    disabled={!isSectionEditing("postnatal")} />
                  <Field
                    label="Hemoglobin"
                    value={form.hemoglobin}
                    onChange={setField("hemoglobin")}
                    placeholder="e.g., 11.5 g/dL"
                    disabled={!isSectionEditing("postnatal")} />
                  <Field
                    label="Blood Sugar"
                    value={form.bloodSugar}
                    onChange={setField("bloodSugar")}
                    placeholder="e.g., 95 mg/dL"
                    disabled={!isSectionEditing("postnatal")} />
                  <Field
                    label="Temp"
                    value={form.temperature}
                    onChange={setField("temperature")}
                    placeholder="e.g., 98.6°F"
                    disabled={!isSectionEditing("postnatal")}/>
                  <Field
                    label="Pulse"
                    value={form.pulse}
                    onChange={setField("pulse")}
                    placeholder="e.g., 78 bpm"
                    disabled={!isSectionEditing("postnatal")}/>
                  <Field
                    label="Bleeding"
                    value={form.bleeding}
                    onChange={setField("bleeding")}
                    placeholder="e.g., Light, Moderate"
                    disabled={!isSectionEditing("postnatal")} />
                  <div className="sm:col-span-2">
                    <TextAreaField
                      label="Pain Level Description"
                      value={form.painLevel}
                      onChange={setField("painLevel")}
                      placeholder="Describe your pain level, location, type, etc. (e.g., Mild cramping in lower abdomen, 3/10 pain)"
                      disabled={!isSectionEditing("postnatal")}
                      rows={4}/>
                  </div>
                </div>
              </SectionCard>
            )}

            {activeTab === "mental" && (
              <SectionCard
                title="Mental & Emotional Health"
                subtitle="How you are feeling emotionally."
                icon={Brain}
                onEdit={() => handleSectionEditToggle("mental")}
                onReset={() => handleSectionReset("mental")}
                isEditing={isSectionEditing("mental")} >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Mood"
                    value={form.mood}
                    onChange={setField("mood")}
                    placeholder="e.g., Good, Low"
                    disabled={!isSectionEditing("mental")}/>
                  <Field
                    label="Emotional Support"
                    value={form.emotionalSupport}
                    onChange={setField("emotionalSupport")}
                    placeholder="e.g., Strong, Limited"
                    disabled={!isSectionEditing("mental")} />
                  <div className="sm:col-span-2">
                    <TextAreaField
                      label="Signs of Postpartum Depression"
                      value={form.postpartumDepressionSigns}
                      onChange={setField("postpartumDepressionSigns")}
                      placeholder="Optional"
                      disabled={!isSectionEditing("mental")}
                      rows={4}/>
                  </div>
                </div>
              </SectionCard>
            )}

            {activeTab === "breastfeeding" && (
              <SectionCard
                title="Breastfeeding & Recovery"
                subtitle="Feeding, sleep, and recovery details."
                icon={HeartPulse}
                onEdit={() => handleSectionEditToggle("breastfeeding")}
                onReset={() => handleSectionReset("breastfeeding")}
                isEditing={isSectionEditing("breastfeeding")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Breastfeeding Started"
                    value={form.breastfeedingStarted}
                    onChange={setField("breastfeedingStarted")}
                    placeholder="e.g., Yes, No, Attempting"
                    disabled={!isSectionEditing("breastfeeding")} />
                  <Field
                    label="Appetite"
                    value={form.appetite}
                    onChange={setField("appetite")}
                    placeholder="e.g., Good, Low"
                    disabled={!isSectionEditing("breastfeeding")}/>
                  <Field
                    label="Sleep"
                    value={form.sleep}
                    onChange={setField("sleep")}
                    placeholder="e.g., 5–6 hours"
                    disabled={!isSectionEditing("breastfeeding")}/>
                  <Field
                    label="Bowel & Urinary"
                    value={form.bowelUrinary}
                    onChange={setField("bowelUrinary")}
                    placeholder="Optional"
                    disabled={!isSectionEditing("breastfeeding")} />
                  <div className="sm:col-span-2">
                    <TextAreaField
                      label="Breastfeeding Issues"
                      value={form.breastfeedingIssues}
                      onChange={setField("breastfeedingIssues")}
                      placeholder="Optional"
                      disabled={!isSectionEditing("breastfeeding")}
                      rows={4} />
                  </div>
                </div>
              </SectionCard>
            )}

            {activeTab === "medical" && (
              <SectionCard
                title="Medical History"
                subtitle="Conditions, medications, and allergies."
                icon={ClipboardList}
                onEdit={() => handleSectionEditToggle("medical")}
                onReset={() => handleSectionReset("medical")}
                isEditing={isSectionEditing("medical")} >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextAreaField
                    label="Pre-existing Conditions"
                    value={form.preExistingConditions}
                    onChange={setField("preExistingConditions")}
                    placeholder="Optional"
                    disabled={!isSectionEditing("medical")} />
                  <TextAreaField
                    label="Pregnancy Complications"
                    value={form.pregnancyComplications}
                    onChange={setField("pregnancyComplications")}
                    placeholder="Optional"
                    disabled={!isSectionEditing("medical")} />
                  <TextAreaField
                    label="Medications"
                    value={form.medications}
                    onChange={setField("medications")}
                    placeholder="Optional"
                    disabled={!isSectionEditing("medical")}/>
                  <TextAreaField
                    label="Allergies"
                    value={form.allergies}
                    onChange={setField("allergies")}
                    placeholder="Optional"
                    disabled={!isSectionEditing("medical")}/>
                </div>
              </SectionCard>
            )}

            {activeTab === "followup" && (
              <SectionCard
                title="Follow-Up & Discharge"
                subtitle="Doctor notes and upcoming visits."
                icon={CalendarClock}
                onEdit={() => handleSectionEditToggle("followup")}
                onReset={() => handleSectionReset("followup")}
                isEditing={isSectionEditing("followup")} >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Next Follow-Up"
                    type="date"
                    value={form.nextFollowUp}
                    onChange={setField("nextFollowUp")}
                    disabled={!isSectionEditing("followup")} />
                  <Field
                    label="Discharge Date"
                    type="date"
                    value={form.dischargeDate}
                    onChange={setField("dischargeDate")}
                    disabled={!isSectionEditing("followup")} />
                  <div className="sm:col-span-2">
                    <TextAreaField
                      label="Doctor Notes"
                      value={form.doctorNotes}
                      onChange={setField("doctorNotes")}
                      placeholder="Optional"
                      disabled={!isSectionEditing("followup")}
                      rows={4} />
                  </div>
                  <div className="sm:col-span-2">
                    <TextAreaField
                      label="Care Instructions"
                      value={form.careInstructions}
                      onChange={setField("careInstructions")}
                      placeholder="Optional"
                      disabled={!isSectionEditing("followup")}
                      rows={4} />
                  </div>
                </div>
              </SectionCard>
            )}

            <div className="bg-pink-200 hover:bg-pink-300 transition font-semibold text-gray-800 shadow-md rounded-full">
              <PrimaryButton type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Submit Updates"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4">
          <div
            className={[
              "rounded-2xl border shadow-lg px-4 py-3 text-sm font-medium backdrop-blur",
              toast.variant === "success"
                ? "bg-green-50/95 border-green-200 text-green-800"
                : toast.variant === "info"
                  ? "bg-blue-50/95 border-blue-200 text-blue-800"
                  : "bg-gray-50/95 border-gray-200 text-gray-800",
            ].join(" ")}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </div>
  );
}