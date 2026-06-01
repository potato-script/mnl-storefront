import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCollection from "./components/FeaturedCollection";
import AllCollections from "./pages/AllCollections";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "collections">(
    "home",
  );

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
        </main>
      ) : (
        <AllCollections onBackToHome={() => setCurrentView("home")} />
      )}
    </div>
  );
}
