import { ReactNode } from "react";

interface FormContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

export function FormContainer({ title, subtitle, children, className = "" }: FormContainerProps) {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-8">
          {children}
        </div>
      </div>
    </section>
  );
}