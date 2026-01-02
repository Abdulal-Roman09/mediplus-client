type ProcessStepProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
};

export function ProcessStep({
  title,
  description,
  icon,
  isLast = false,
}: ProcessStepProps) {
  return (
    <div className="relative text-center">
      <div className="bg-background mx-auto mb-4 flex size-12 items-center justify-center rounded-full border shadow-sm">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
      {!isLast && (
        <div className="absolute top-6 left-[60%] hidden w-full border-t border-dashed md:block" />
      )}
    </div>
  );
}