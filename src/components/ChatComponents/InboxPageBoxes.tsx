import { cn } from "utils/cn";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Skeleton } from "components/ui/skeleton";
import Loader from "components/Loader";

interface WrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function ContactListWrapper({ className, ...props }: WrapperProps) {
  return (
    <div
      className={cn(
        "max-xl:hidden dark:bg-woodsmoke-700 py-5 min-h-full max-h-full h-full overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

function InboxPageWrapper({ className, ...props }: WrapperProps) {
  return (
    <div
      className={cn(
        "absolute left-0 w-full h-[calc(100vh-var(--navbar-height))] overflow-hidden grid xl:grid-cols-[20rem_1fr_20rem] bg-white",
        className
      )}
      {...props}
    />
  );
}

function PageLoadingSkeleton() {
  return (
    <InboxPageWrapper>
      <ContactListWrapper className="space-y-4 overflow-hidden pt-8 px-8">
        {new Array(18).fill("").map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton className="h-11 w-11 rounded-full flex-shrink-0" />

            <div className="space-y-2 flex-1">
              <Skeleton key={i} className="w-[100%] h-3" />
              <Skeleton key={i} className="w-[60%] h-2" />
            </div>
          </div>
        ))}
      </ContactListWrapper>
      <div className="p-10 bg-white flex items-center justify-center">
        <Loader.CircularSnake className="w-10 h-10" duration={1} />
      </div>

      <div className="p-10 space-y-8 overflow-hidden">
        {new Array(18).fill("").map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-3 w-[90%] rounded-full" />
            <Skeleton className="h-3 w-[80%] rounded-full" />
          </div>
        ))}
      </div>
    </InboxPageWrapper>
  );
}

export { InboxPageWrapper, ContactListWrapper, PageLoadingSkeleton };
