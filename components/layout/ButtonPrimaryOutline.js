import { Icon } from "@iconify/react";
import Link from "next/link";

function ButtonPrimaryOutline({ children, link, title }) {
  return (
    <Link
      className="px-10 py-4 border border-primary rounded-full  text-primary text-[10px] font-semibold text-base justify-center uppercase w-full lg:max-w-max flex items-center gap-2"
      href={link}
      rel="noopener noreferrer"
      title={title}
    >
      {children} <Icon icon="prime:arrow-up-right" width="24" height="24" />
    </Link>
  );
}

export default ButtonPrimaryOutline;
