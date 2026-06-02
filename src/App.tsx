import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCollection from "./components/FeaturedCollection";
import AllCollections from "./pages/AllCollections";
import Lookbook from "./components/Lookbook";
import LookbookDetail from "./pages/LookbookDetail";
import About from "./components/About";
import BlogStory from "./components/BlogStory";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [currentPath] = useState(window.location.pathname);

  const [currentView, setCurrentView] = useState<
    "home" | "collections" | "story"
  >("home");

  useEffect(() => {
    if (window.location.hash === "#lookbook") {
      setTimeout(() => {
        const element = document.getElementById("lookbook");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  const handleNavigate = (view: "home" | "collections" | "story") => {
    if (currentView !== view) {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  if (currentPath.startsWith("/lookbook/")) {
    return <LookbookDetail />;
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white antialiased">
      <Navbar
        currentView={currentView === "story" ? "collections" : currentView}
        onNavigate={(view) => handleNavigate(view)}
      />

      {currentView === "home" && (
        <main>
          <Hero />

          <div id="shop">
            <FeaturedCollection
              onNavigateToAll={() => handleNavigate("collections")}
            />
          </div>

          <div id="lookbook">
            <Lookbook />
          </div>

          <About onReadStory={() => handleNavigate("story")} />
          <Contact />
        </main>
      )}

      {currentView === "collections" && (
        <AllCollections onBackToHome={() => handleNavigate("home")} />
      )}

      {currentView === "story" && (
        <BlogStory onBackToHome={() => handleNavigate("home")} />
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
