import { AuthContext } from "Providers/AuthContextProvider";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "utils/cn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const examples = [
  {
    name: "Home",
    href: "/dashboard",
  },
  {
    name: "Dashboard",
    href: "/admin-panel",
  },
  {
    name: "Members",
    href: "/admin-panel/members",
  },
  {
    name: "Disputes",
    href: "/admin-panel/disputes",
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const { logout } = useContext(AuthContext);

  return (
    <header className="relative bg-woodsmoke-200">
      <main className="container-wrapper flex items-center justify-between">
        <ScrollArea className="">
          <div className={cn("flex items-center h-14", className)} {...props}>
            {examples.map((example) => (
              <NavLink
                end
                to={example.href}
                key={example.href}
                className={({ isActive }) =>
                  cn(
                    `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm hover:text-black/50`,
                    isActive ? "text-primary" : null
                  )
                }
              >
                {example.name}
              </NavLink>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>

        <button
          type="button"
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </button>
      </main>
    </header>
  );
}

function AdminPage() {
  return (
    <div>
      <ExamplesNav />
      <main className="pb-20">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
