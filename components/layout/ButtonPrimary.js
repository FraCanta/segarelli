import { Icon } from "@iconify/react";

function ButtonPrimary({ children, onClick }) {
  return (
    <button
      className="px-10 py-2 bg-primary rounded-full text-white font-semibold text-base uppercase max-w-max flex items-center gap-2"
      onClick={onClick}
    >
      {children} <Icon icon="prime:arrow-up-right" width="24" height="24" />
    </button>
  );
}

export default ButtonPrimary;
