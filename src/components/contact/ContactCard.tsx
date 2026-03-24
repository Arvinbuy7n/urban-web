import { ArrowUpRight, type LucideIcon } from "lucide-react";

type ContactCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  external: boolean;
};

export const ContactCard = ({
  icon: Icon,
  label,
  value,
  href,
  external,
}: ContactCardProps) => (
  <div className="group relative bg-white rounded-xl p-4 border border-slate-100 shadow-sm overflow-hidden flex items-center gap-3 hover:border-primary/20 hover:shadow-md transition-all duration-300">
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

    <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center shrink-0 transition-colors duration-300">
      <Icon className="w-3.5 h-3.5 text-primary" />
    </div>

    <div className="min-w-0">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-primary transition-colors duration-300 whitespace-pre-line"
        >
          {value}
          {external && (
            <ArrowUpRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </a>
      ) : (
        <p className="text-xs font-semibold text-slate-900 whitespace-pre-line">
          {value}
        </p>
      )}
    </div>
  </div>
);
