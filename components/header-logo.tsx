import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={36}
        height={36}
        className="dark:invert"
      />
      <span className="hidden font-bold lg:inline-block">Charity-Fund</span>
    </Link>
  );
};
