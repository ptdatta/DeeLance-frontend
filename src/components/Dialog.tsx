import React, { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "utils/cn";
import { MdOutlineClose } from "react-icons/md";
import { VariantProps, cva } from "class-variance-authority";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

export interface DialogCloseIconProps
  extends DialogPrimitive.DialogCloseProps {}

const DialogCloseIcon = ({ className, ...props }: DialogCloseIconProps) => {
  return (
    <DialogPrimitive.Close
      className={cn("text-2xl opacity-30 hover:opacity-100", className)}
      {...props}
    >
      <MdOutlineClose />
    </DialogPrimitive.Close>
  );
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className="bg-black/50 z-[4000]" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-[5000] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-woodsmoke-700 p-6 shadow-lg shadow-black/40 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeaderVariants = cva("", {
  variants: {
    variant: {
      bordered: "border-b border-black/40 dark:border-white/40 py-5",
    },
  },
});

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof DialogHeaderVariants> {}

const DialogHeader = ({ className, variant, ...props }: DialogHeaderProps) => (
  <header
    className={cn(DialogHeaderVariants({ variant, className }))}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooterVariants = cva("flex justify-end space-x-2", {
  variants: {
    variant: {
      bordered: "border-t border-black/40 dark:border-white/40 py-4",
    },
  },
});

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof DialogFooterVariants> {}

const DialogFooter = ({ className, variant, ...props }: DialogFooterProps) => (
  <footer
    className={cn(DialogFooterVariants({ variant, className }))}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  // CUSTOM COMPONENTS
  DialogCloseIcon,
};
