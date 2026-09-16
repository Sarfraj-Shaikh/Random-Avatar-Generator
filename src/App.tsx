import { useState, useEffect, useRef } from "react";

// 1. Interface Definitions
interface Option {
  label: string;
  value: string;
  icon: string;
  type: "dicebear" | "randomuser";
}

function App() {

  const options: Option[] = [
    {
      label: "Illustration",
      value: "avataaars",
      icon: "ri-palette-line",
      type: "dicebear",
    },
    {
      label: "Adventurer",
      value: "adventurer",
      icon: "ri-emotion-happy-line",
      type: "dicebear",
    },
    {
      label: "Lorelei",
      value: "lorelei",
      icon: "ri-brush-line",
      type: "dicebear",
    },
    {
      label: "Robots",
      value: "bottts",
      icon: "ri-robot-line",
      type: "dicebear",
    },
    {
      label: "Pixel Art",
      value: "pixel-art",
      icon: "ri-game-line",
      type: "dicebear",
    },
    {
      label: "Male",
      value: "men",
      icon: "ri-men-line",
      type: "randomuser",
    },
    {
      label: "Female",
      value: "women",
      icon: "ri-women-line",
      type: "randomuser",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const generateAvatar = (targetOption: Option = selectedOption) => {

    setIsLoading(true);

    const randomSeed = Math.random().toString(36).substring(7);

    if (targetOption.type === "randomuser") {

      const randomId = Math.floor(Math.random() * 99) + 1;
      setCurrentUrl(`https://randomuser.me/api/portraits/${targetOption.value}/${randomId}.jpg`);

    } else {

      setCurrentUrl(`https://api.dicebear.com/9.x/${targetOption.value}/svg?seed=${randomSeed}`);

    }

  };

  useEffect(() => {

    generateAvatar(options[0]);

  }, []);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

        setIsOpen(false);

      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const handleSelect = (option: Option) => {

    setSelectedOption(option);
    setIsOpen(false);
    generateAvatar(option);

  };

  const handleDownload = async () => {

    try {

      const response = await fetch(currentUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `avatar-${selectedOption.value}-${Date.now()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

    } catch (error) {

      console.error("Error downloading avatar:", error);

    }

  };

  return (

    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">

      {/* Background Gradients */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_25px_80px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">

          {/* Header */}
          <div className="border-b border-slate-100 px-6 py-7 sm:px-10">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-gradient-to-r from-violet-50 to-sky-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-sky-500" />
                  Avatar Generator
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Create your{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                    perfect avatar
                  </span>
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Choose a style and generate a unique avatar for your profile, project, or social presence.
                </p>
              </div>

              <div className="hidden h-16 w-16 rotate-3 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 text-3xl text-white shadow-lg shadow-violet-200 sm:flex">
                <i className="ri-user-smile-line"></i>
              </div>

            </div>

          </div>

          {/* Main Content */}
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">

            {/* Avatar Preview */}
            <div className="flex flex-col items-center justify-center">

              <div className="group relative">

                <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-r from-violet-400/30 via-fuchsia-400/20 to-sky-400/30 opacity-70 blur-2xl transition duration-700 group-hover:opacity-100" />

                <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-[2.5rem] border border-white bg-gradient-to-br from-violet-50 via-white to-sky-50 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.35)] transition duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] sm:h-80 sm:w-80">

                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-200/50 to-fuchsia-200/30 blur-xl" />

                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-sky-200/50 to-cyan-200/30 blur-xl" />

                  {/* Loading Spinner */}
                  {isLoading && (
                    <div className="absolute z-20 flex flex-col items-center gap-2 text-violet-600">
                      <i className="ri-loader-4-line text-4xl animate-spin"></i>
                      <span className="text-xs font-semibold text-slate-500">Generating...</span>
                    </div>
                  )}

                  {/* Image Element */}
                  {currentUrl && (
                    <img
                      key={currentUrl}
                      src={currentUrl}
                      alt="Avatar preview"
                      onLoad={() => setIsLoading(false)}
                      onError={() => setIsLoading(false)}
                      className={`relative z-10 h-52 w-52 object-cover transition-opacity duration-300 sm:h-64 sm:w-64 ${isLoading ? "opacity-0" : "opacity-100"
                        }`}
                    />
                  )}

                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 rounded-full border border-slate-200/60 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready to generate
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col justify-center">

              <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">

                {/* Dropdown Menu */}
                <div className="mb-6" ref={dropdownRef}>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Choose avatar style
                  </label>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:border-violet-300 hover:shadow-md focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${selectedOption.icon} text-lg text-violet-600`}></i>
                        <span>{selectedOption.label}</span>
                      </div>
                      <i className={`ri-arrow-down-s-line text-xl text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}></i>
                    </button>

                    {isOpen && (
                      <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-xl backdrop-blur-lg animate-in fade-in zoom-in-95">
                        {options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${selectedOption.value === option.value
                              ? "bg-violet-50 text-violet-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <i className={`${option.icon} text-lg ${selectedOption.value === option.value ? "text-violet-600" : "text-slate-400"}`}></i>
                              <span>{option.label}</span>
                            </div>
                            {selectedOption.value === option.value && (
                              <i className="ri-check-line text-lg text-violet-600"></i>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Style Card */}
                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-sky-50 p-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-violet-600 shadow-sm">
                    <i className={selectedOption.icon}></i>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700">
                      {selectedOption.label} Style
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      Currently active layout generator
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300 active:translate-y-0"
                  >
                    <i className="ri-download-2-line text-lg transition-transform duration-300 group-hover:translate-y-0.5"></i>
                    <span>Download</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => generateAvatar()}
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-gradient-to-r hover:from-violet-50 hover:to-sky-50 hover:text-violet-700 hover:shadow-md active:translate-y-0"
                  >
                    <i className="ri-refresh-line text-lg transition-transform duration-500 group-hover:rotate-180"></i>
                    <span>Change</span>
                  </button>
                </div>

              </div>

              {/* Footer Hint */}
              <div className="mt-5 flex items-start gap-3 px-2 text-xs leading-5 text-slate-400">
                <i className="ri-information-line shrink-0 text-base text-slate-400"></i>
                <p>
                  Made By <strong>Mo. Sarfra Shaikh</strong> For Developers.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>

  );
  
}

export default App;