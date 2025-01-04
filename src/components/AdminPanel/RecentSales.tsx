import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Card() {
  return (
    <div className="flex sm:items-center space-x-4">
      <Avatar className="h-10 w-10 border border-white/20">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>

      <div className="max-sm:pt-0.5 flex sm:items-center justify-between flex-1 max-sm:flex-col max-sm:space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm opacity-70">olivia.martin@email.com</p>
        </div>

        <div className="sm:ml-auto font-medium max-md:text-sm">+$1,999.00</div>
      </div>
    </div>
  );
}

export function RecentSales() {
  return (
    <div className="space-y-8">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
