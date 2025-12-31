import { Icon } from "@iconify/react";
import Link from "next/link";

function ButtonPrimaryOutline({ children, link, title, icon, target }) {
  return (
    <Link
      className="px-6 py-4 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 border border-primary rounded-full tracking-wide   text-primary xl:text-sm 2xl:text-base font-semibold  justify-center uppercase w-full lg:max-w-max flex items-center gap-2"
      href={link}
      rel="noopener noreferrer"
      title={title}
      target={target}
    >
      <span className="split-hover flex flex-col justify-center relative">
        <span className="line line-normal block p-1">{children}</span>
        <span className="line line-hover block absolute top-0 left-0 w-full p-1">
          {children}
        </span>
      </span>{" "}
      <Icon icon={icon} width="24" height="24" />
    </Link>
  );
}

export default ButtonPrimaryOutline;
