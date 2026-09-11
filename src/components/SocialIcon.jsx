export default function SocialIcon({ icon, className = "h-5 w-5" }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
