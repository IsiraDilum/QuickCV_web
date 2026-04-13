import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLocation } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCV from "./pages/CreateCV";
import ThemeSelect from "./pages/ThemeSelect";
import CVPreview from "./pages/CVPreview";
import About from "./pages/About";
import AiChatButton from "./components/AiChatButton";

import FogotpasswordPage1 from "./pages/Fogotpasswordpages/fogotpasswordpage1";
import VerificationPage from "./pages/Fogotpasswordpages/VerificationPage";
import EmailVerifiedpage from "./pages/Fogotpasswordpages/EmailVerifiedpage";
import Passwordresetpage from "./pages/Fogotpasswordpages/Passwordresetpage";
import SuccessfullyResetPassword from "./pages/Fogotpasswordpages/SuccessfullyResetPassword";

// Protect private routes
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
};

function App() {

    const googleClientId =
        "252848249863-n65nnb083h06vb9m7v1l2r0sa48a899p.apps.googleusercontent.com";

    const ChatbotWrapper = () => {
        const location = useLocation();

        const hideRoutes = [
            "/login",
            "/register",
            "/forgot-password",
            "/verify",
            "/email-verified",
            "/reset-password",
            "/success"
        ];

        if (hideRoutes.includes(location.pathname)) {
            return null; // ❌ hide chatbot
        }

        return <AiChatButton />; // ✅ show chatbot
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <BrowserRouter>

                <Routes>

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />

                    {/* Forgot Password Flow */}
                    <Route path="/forgot-password" element={<FogotpasswordPage1 />} />
                    <Route path="/verify" element={<VerificationPage />} />
                    <Route path="/email-verified" element={<EmailVerifiedpage />} />
                    <Route path="/reset-password" element={<Passwordresetpage />} />
                    <Route path="/success" element={<SuccessfullyResetPassword />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/create-cv"
                        element={
                            <ProtectedRoute>
                                <CreateCV />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/select-theme"
                        element={
                            <ProtectedRoute>
                                <ThemeSelect />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/cv-preview"
                        element={
                            <ProtectedRoute>
                                <CVPreview />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
                <ChatbotWrapper />

            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;