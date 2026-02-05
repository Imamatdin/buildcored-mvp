interface LogoProps {
  className?: string;
  src?: string;
  alt?: string;
}

const Logo = ({
  className = "",
  src = "/logo.svg",
  alt = "Logo",
}: LogoProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
    />
  );
};

export default Logo;
