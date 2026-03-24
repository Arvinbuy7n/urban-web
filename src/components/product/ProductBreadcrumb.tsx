import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ProductBreadcrumbProps = {
  category: string;
  title: string;
};

export const ProductBreadcrumb = ({
  category,
  title,
}: ProductBreadcrumbProps) => (
  <div className="bg-white border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
      <Link href="/" className="hover:text-primary transition-colors">
        Нүүр
      </Link>
      <ChevronRight className="w-3 h-3" />
      <Link href="/categories" className="hover:text-primary transition-colors">
        Бүтээгдэхүүн
      </Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-slate-600">{category}</span>
      <ChevronRight className="w-3 h-3" />
      <span className="text-slate-900 truncate max-w-[200px]">{title}</span>
    </div>
  </div>
);
