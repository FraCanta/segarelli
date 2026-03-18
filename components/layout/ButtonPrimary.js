import { Icon } from "@iconify/react";
import Link from "next/link";

function ButtonPrimary({ children, link, title }) {
  return (
    <Link
      scroll={false}
      className="px-6 py-4 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 bg-primary rounded-full text-white w-full xl:text-sm 2xl:text-base tracking-wide uppercase justify-center lg:max-w-max flex items-center gap-2"
      href={link}
      rel="noopener noreferrer"
      title={title}
    >
      <span className="split-hover flex flex-col justify-center relative">
        <span className="line line-normal block p-1">{children}</span>
        <span className="line line-hover block absolute top-0 left-0 w-full p-1">
          {children}
        </span>
      </span>{" "}
      <Icon icon="prime:arrow-up-right" width="24" height="24" />
    </Link>
  );
}

export default ButtonPrimary;
