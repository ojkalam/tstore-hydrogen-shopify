interface IconProps {
  className?: string;
}

export function CartIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg 
      className={className} 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}