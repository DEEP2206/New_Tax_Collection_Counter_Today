import React from "react";

export default function TopNav({ onToggleMobileMenu, isMobileMenuOpen }) {
  const logoUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAR65bHCqXBkmw199Z7wqSQrxgeWpBjIKCdMH6nHT4u5AENieJ-OYsVHiGM-tZfE7hINv2e4xpFbiwMK4DIUvvZU2hMPVsFfVNrz8bl98RHJ9qEY6Y_kT1Gl75-FNkX7FssMj6OFEpVGGpQkYqwF8DpMplhY9RlRu6o34aoaBBQQZNNieJ5R_m8VxE8L9cnFEDeq6XY9H0RSL7u7VV4gp3tomP1gqWDBwE4eKE0Uevj9tDLnBxY-MxalfJkrsduD1CxmSM";
  const profileUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAWjMM2wWFwEJI0t7jx9uHt2zad0ykCRiIqm8CiLMjTwXfuIHUq0yVo7b0t9zGLgdK08WMjx73EbP1HpQs1fI4uXGxIN-okH7eQ_v1AUyswczbHQLFbLIWwRoGq80bRijmQb1ynxd6f0zazuZ3ZgnUmTgslI4cCeRGOlS7KixtC4kxaCMvoxH6wOx8hmcbW-pr8pBdOyXLdLaPJNdqRii-mPvNSClVp2axqEZFX8fdmQgwLfCiBx72FPQ";

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 justify-between items-center px-margin-desktop h-16 bg-surface-container-lowest border-b border-outline-variant shadow-sm hidden md:flex">
        <div className="flex items-center gap-4">
          <img
            alt="वडगाव मावळ नगरपंचायत लोगो"
            className="h-9 w-auto object-contain"
            src={logoUrl}
          />
          <span className="text-headline-md font-headline-md font-bold text-primary">
            वडगाव मावळ नगरपंचायत
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <button
              title="Language"
              aria-label="Language selector"
              className="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined">language</span>
            </button>
            <button
              title="Help"
              aria-label="Help and documentation"
              className="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined">help</span>
            </button>
            <button
              title="Account"
              aria-label="Account details"
              className="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
          <div className="flex items-center gap-3 border-l border-outline-variant pl-6">
            <img
              alt="User profile"
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
              src={profileUrl}
            />
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                VIJAY BHIMRAO JADHAV
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant opacity-80">
                Admin
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-margin-mobile h-16 bg-surface-container-lowest border-b border-outline-variant w-full fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            alt="वडगाव मावळ नगरपंचायत लोगो"
            className="h-8 w-auto object-contain"
            src={logoUrl}
          />
          <span className="text-headline-md font-headline-md font-bold text-primary text-base">
            वडगाव मावळ नगरपंचायत
          </span>
        </div>
        <button
          onClick={onToggleMobileMenu}
          aria-label="Toggle Navigation Menu"
          className="p-2 text-on-surface rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>
    </>
  );
}
