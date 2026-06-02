import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCollection from "./components/FeaturedCollection";
import AllCollections from "./pages/AllCollections";
import Lookbook from "./components/Lookbook";
import LookbookDetail from "./pages/LookbookDetail";

export default function App() {
  const [currentPath] = useState(window.location.pathname);
  const [currentView, setCurrentView] = useState<"home" | "collections">(
    "home",
  );

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

  if (currentPath.startsWith("/lookbook/")) {
    return <LookbookDetail />;
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white antialiased">
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />

      {currentView === "home" ? (
        <main>
          <Hero />

          <div id="shop">
            <FeaturedCollection
              onNavigateToAll={() => setCurrentView("collections")}
            />
          </div>
          <div id="lookbook">
            <Lookbook />
          </div>
        </main>
      ) : (
        <AllCollections onBackToHome={() => setCurrentView("home")} />
      )}
    </div>
  );
}
