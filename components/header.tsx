import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { HeaderLogin } from "./header-login";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-[#1e66f5] to-[#04a5e5] px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <HeaderLogin />
        </div>
        <h1 className="text-black text-4xl font-bold">
          Donate now to help those in need
        </h1>
      </div>
    </header>
  );
};
