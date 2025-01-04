// @ts-nocheck

import { forwardRef } from "react";
import SelectBox from "react-select";
import useTheme from "states/useTheme";
import Typography from "./Typography";

const Select = forwardRef(
  (
    {
      options,
      label,
      error,
      as,
      isMulti,
      darkColorScheme,
      lightColorScheme,
      menuPortalTarget = document.querySelector("#modals"),
      ...props
    }: any,
    ref
  ) => {
    const globalTheme = useTheme((state) => state.theme);
    const Comp = as || SelectBox;

    const defaultColorScheme = {
      dark: {
        main: "#4c4d58",
        ...darkColorScheme,
      },
      light: {
        main: "#d9d9de",
        ...lightColorScheme,
      },
    };

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label>
        {label ? <Typography className="mb-1">{label}</Typography> : null}

        <Comp
          {...props}
          ref={ref}
          options={options}
          menuPortalTarget={menuPortalTarget}
          isMulti={isMulti}
          styles={{
            container: (base) => ({
              ...base,
            }),
            control: (base) => ({
              ...base,
              //   height: "44px",
              // minHeight: "44px",
              padding: ".22rem 0",
              border: `1px solid ${
                Boolean(error) === true ? "red" : "transparent"
              }`,
            }),
            valueContainer: (base) => ({
              ...base,
              padding: "0 .6rem",
            }),
            multiValue: (base) => ({
              ...base,
              borderRadius: "2rem",
              padding: ".2rem .4rem",
              margin: "3px",
            }),
            multiValueRemove: (base) => ({
              ...base,
              borderRadius: "50%",
              ":hover": {
                backgroundColor: "transparent",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 100000000,
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              neutral0:
                globalTheme === "light"
                  ? defaultColorScheme.light.main
                  : defaultColorScheme.dark.main,
              primary: "#06a551",
              primary25: globalTheme === "light" ? "#7afbb6" : "#00331a",
              primary50: "#0d5a34",
              neutral90: "green",
              dangerLight: "#eb5757",

              primary75: "white",
              neutral80:
                globalTheme === "light"
                  ? "black"
                  : isMulti
                    ? "#10d76d"
                    : "white",
              neutral70: "green",
              neutral60:
                globalTheme === "light"
                  ? "black"
                  : isMulti
                    ? "#10d76d"
                    : "white",
              neutral50:
                globalTheme === "light"
                  ? "rgba(0,0,0,.3)"
                  : "rgba(255,255,255,.6)",
              neutral5: "transparent",
              //   neutral40: "red",
              neutral30: "transparent",
              neutral20:
                globalTheme === "light"
                  ? "rgba(0,0,0,.3)"
                  : "rgba(255,255,255,.6)",
              neutral10: globalTheme === "light" ? "#b8b9c1" : "#393941",
            },
          })}
        />

        {error ? (
          <span className="mt-2 flex text-red-500 w-fit pointer-events-none select-none text-sm">
            {error}
          </span>
        ) : null}
      </label>
    );
  }
);

Select.displayName = "Select";

export default Select;
