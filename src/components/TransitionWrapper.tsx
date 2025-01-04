import useDelayUnmount from "hooks/useDelayUnmount";
import Portal from "./Portal";

function TransitionWrapper({ children, className, open }: any) {
  const shouldRender = useDelayUnmount(open, 300);

  const portalStyle = { zIndex: 100000000 };
  const blackScreenStyle = { zIndex: 100000 };

  return (
    <>
      {shouldRender && (
        <>
          <Portal>
            <div
              style={portalStyle}
              className={`popup ${className} ${open ? "mount" : "unmount"}`}
            >
              {children}
            </div>
          </Portal>

          <Portal>
            <div
              className={`black-screen-animated backdrop-blur-[8px] improve-performance ${
                open ? "show" : "hide"
              }`}
              style={blackScreenStyle}
            />
          </Portal>
        </>
      )}
    </>
  );
}

export default TransitionWrapper;
