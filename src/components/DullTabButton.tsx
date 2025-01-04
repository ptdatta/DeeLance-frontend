import Button from "./Button";

export const DullTabButton = ({ active, onClick, children }: any) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      rounded="full"
      variant={active ? "contained" : "outlined"}
      className={`border-woodsmoke-900 border-2 font-medium ${
        active ? "bg-woodsmoke-900" : "text-black/60 dark:text-white/40"
      }`}
    >
      {children}
    </Button>
  );
};
export default DullTabButton;
