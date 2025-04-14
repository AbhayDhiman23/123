import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AboutPage from "./pages/about/About";
import ContactPage from "./pages/contact/Contact";
import PricingPage from "./pages/pricing/Pricing";
import FAQPage from "./pages/faq/Faq";

// import PricingPage from "./pages/pricing/Pricing";


// admin
import Home from "./admin/pages/Home";
import ProductsPage from "./admin/pages/Productpage";
import CategoriesPage from "./admin/pages/CategoriesPage";
import UserPage from "./admin/pages/UserPage";
import SettingsPage from "./admin/pages/SettingsPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        {/* admin routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/users" element={<UserPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
