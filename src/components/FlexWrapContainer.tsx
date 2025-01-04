const FlexWrapContainer = ({ children, marginValue = 4 }: any) => {
  const marginClass = `[&>*]m-${marginValue}`;
  const negativeMarginClass = `-m-${marginValue}`;

  return (
    <div className={`flex flex-wrap ${marginClass} ${negativeMarginClass}`}>
      {children}
    </div>
  );
};

export default FlexWrapContainer;
