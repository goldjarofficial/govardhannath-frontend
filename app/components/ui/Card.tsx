interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = '',
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-[#E9DDC7]
        bg-white
        shadow-[0_3px_12px_rgba(60,30,10,0.06)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}