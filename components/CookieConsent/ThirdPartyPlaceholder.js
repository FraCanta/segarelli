import { openCookiePreferences } from "./CookieBanner";

export default function ThirdPartyPlaceholder({ title, description, buttonLabel }) {
  return (
    <div className="min-h-[320px] w-full border border-primary/30 bg-primary/10 flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h3 className="text-2xl text-primary">{title}</h3>
      <p className="max-w-xl text-blu/70">{description}</p>
      <button
        type="button"
        onClick={openCookiePreferences}
        className="px-6 py-3 bg-siena text-white uppercase text-sm"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
