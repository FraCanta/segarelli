import { Icon } from "@iconify/react";
import Link from "next/link";

function ButtonPrimary({ children, link, title }) {
  return (
    <Link
      scroll={false}
      className="px-10 py-4 bg-primary rounded-full text-white w-full font-semibold text-base uppercase justify-center lg:max-w-max flex items-center gap-2"
      href={link}
      rel="noopener noreferrer"
      title={title}
    >
      {children} <Icon icon="prime:arrow-up-right" width="24" height="24" />
    </Link>
  );
}

export default ButtonPrimary;
