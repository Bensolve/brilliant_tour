import Link from "next/link";

interface Props {
  title: string;
  link?: string;
  linkText?: string;
}

export default function SectionHeader({ title, link, linkText }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between w-full">
      {/* 1. TYPOGRAPHY & ACCENT */}
      <div className="flex flex-col gap-2 max-w-full">
        <h2 className="bold-28 md:bold-32 lg:bold-40 text-slate-900 leading-[120%] break-words">
          {title}
        </h2>
        {/* The "Green Accent" bar */}
        <div className="h-1.5 w-12 rounded-full bg-green-50" />
      </div>

      {/* 2. LINK: Positioned better for mobile tap targets */}
      {link && (
        <Link 
          href={link} 
          className="group flex items-center gap-2 regular-16 text-green-50 transition-all hover:text-green-90 w-fit"
        >
          <span className="font-bold whitespace-nowrap">
            {linkText || "View All"} 
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">
            →
          </span>
        </Link>
      )}
    </div>
  );
}