import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const socials = [
  {
    name: "Facebook",
    icon: "mdi:facebook",
    url: (title, link) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
  },

  {
    name: "WhatsApp",
    icon: "mdi:whatsapp",
    url: (title, link) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + " " + link
      )}`,
  },
];

export default function ShareButtons({ title, link }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset messaggio dopo 2s
    } catch (err) {
      console.error("Errore copia link:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-wrap gap-3">
        {/* Copy Link */}
        <button
          onClick={copyLink}
          aria-label="Copia link"
          title="Copia link"
          className="p-3 border border-white/30 hover:border-white transition"
        >
          <Icon
            icon="mdi:link-variant"
            width={24}
            height={24}
            className="text-white"
          />
        </button>
        {socials.map((s) => (
          <Link
            key={s.name}
            title={`Condividi su ${s.name}`}
            href={s.url(title, link)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Condividi su ${s.name}`}
            className="p-3 border border-white/30 hover:border-white transition"
          >
            <Icon icon={s.icon} width={24} height={24} className="text-white" />
          </Link>
        ))}
      </div>
      {copied && <p className="text-sm text-white">Link copiato!</p>}
    </div>
  );
}
