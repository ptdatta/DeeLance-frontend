import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageLayoutProps {
  children: ReactNode;
  childrenWrapperClassName?: string;
  showFooter?: boolean;
  navbarClassName?: string;
}

function PageLayout({
  children,
  childrenWrapperClassName,
  showFooter = true,
  navbarClassName,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className={navbarClassName} />

      <main
        className={twMerge(
          "flex-1 pt-8 mt-navbar-height pb-20",
          childrenWrapperClassName
        )}
      >
        {children}
      </main>

      {showFooter ? <Footer /> : null}
    </div>
  );
}

export default PageLayout;
