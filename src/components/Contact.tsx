import React, { useState, useRef, useEffect } from "react";
import { MapPin, Mail, Phone, Clock, ChevronDown } from "lucide-react"; // Added ChevronDown

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topics = [
    { value: "order", label: "Order & Sizing Queries" },
    { value: "collab", label: "Collaborations / Media" },
    { value: "feedback", label: "General Feedback" },
  ];

  const currentTopicLabel =
    topics.find((t) => t.value === formData.subject)?.label || "Select a topic";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Transmission sent:", formData);
  };

  return (
    <section
      id="contact"
      className="bg-[#0D0D0D] text-white pt-30 py-24 border-t border-white/5 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="space-y-3 mb-16">
          <p className="font-mono text-xs tracking-[0.25em] text-[#8A8A8A] uppercase">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Let's talk.
          </h2>
          <p className="text-sm md:text-base text-[#8A8A8A] max-w-xl">
            Questions about an order, sizing, or collabs? We're here for it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-xs text-[#8A8A8A] tracking-wide">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Juan"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full bg-[#262626] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-xs text-[#8A8A8A] tracking-wide">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="dela Cruz"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full bg-[#262626] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs text-[#8A8A8A] tracking-wide">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#262626] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-[#8A8A8A] tracking-wide">
                Subject
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full bg-[#262626] border text-left rounded-xl px-4 py-3 text-sm flex justify-between items-center transition-all duration-200 focus:outline-none cursor-pointer ${
                    isDropdownOpen ? "border-[#D4AF37]" : "border-white/10"
                  }`}>
                  <span
                    className={
                      formData.subject ? "text-white" : "text-[#555555]"
                    }>
                    {currentTopicLabel}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A8A8A] transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-[#D4AF37]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute z-10 mt-2 w-full bg-[#262626] border border-white/10 rounded-xl overflow-hidden shadow-xl transition-all duration-200 origin-top list-none ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}>
                  <div className="py-1">
                    {topics.map((topic) => (
                      <button
                        key={topic.value}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, subject: topic.value });
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/5 cursor-pointer ${
                          formData.subject === topic.value
                            ? "text-[#D4AF37] bg-white/5"
                            : "text-[#E5E5E5]"
                        }`}>
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-xs text-[#8A8A8A] tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us what's on your mind..."
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#262626] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-transparent border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white font-medium text-sm py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-[0.99] cursor-pointer">
              Send message
            </button>
          </form>

          <div className="lg:col-span-5 space-y-8 w-full">
            <div className="bg-[#212121]/40 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#262626] border border-white/10 rounded-xl text-[#8A8A8A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] tracking-wider text-[#666666] uppercase font-bold">
                    Store
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Cubao, Quezon City
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    Metro Manila, Philippines
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#262626] border border-white/10 rounded-xl text-[#8A8A8A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] tracking-wider text-[#666666] uppercase font-bold">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-white">
                    hello@mnlclothing.ph
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#262626] border border-white/10 rounded-xl text-[#8A8A8A] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] tracking-wider text-[#666666] uppercase font-bold">
                    Phone / Viber
                  </p>
                  <p className="text-sm font-semibold text-white">
                    +63 917 000 0000
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    Mon - Sat, 10am - 7pm
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/5" />

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#262626] border border-white/10 rounded-xl text-[#8A8A8A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] tracking-wider text-[#666666] uppercase font-bold">
                    Store Hours
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Mon - Sat · 10am - 8pm
                  </p>
                  <p className="text-xs text-[#8A8A8A]">Sunday · 11am - 6pm</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-widest text-[#666666] uppercase font-bold">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-transparent border border-white/10 hover:border-[#D4AF37] px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide text-[#E5E5E5] duration-300 hover:text-[#D4AF37] transition-colors cursor-pointer">
                  <svg
                    className="w-3.5 h-3.5 stroke-current fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-transparent border border-white/10 hover:border-[#D4AF37] px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide text-[#E5E5E5] hover:text-[#D4AF37] transition-colors cursor-pointer">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.51 4.24 1.1 1.43 2.69 2.39 4.41 2.72v3.74c-.97-.07-1.95-.38-2.82-.84-.82-.44-1.54-1.05-2.12-1.77v6.64c.04 2.3-.9 4.61-2.6 6.13-1.85 1.68-4.48 2.38-6.94 1.83-2.55-.51-4.76-2.28-5.74-4.71-1.22-2.94-.48-6.55 1.83-8.67 1.8-1.68 4.34-2.24 6.56-1.49V11.2c-1.21-.43-2.61-.17-3.55.72-.94.86-1.27 2.24-.82 3.44.42 1.17 1.57 1.99 2.81 2.01 1.51.07 2.87-1.02 3.03-2.52.03-1.03.01-2.07.02-3.11V0h-.44z" />
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-transparent border border-white/10 hover:border-[#D4AF37] px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide text-[#E5E5E5] hover:text-[#D4AF37] transition-colors cursor-pointer">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
