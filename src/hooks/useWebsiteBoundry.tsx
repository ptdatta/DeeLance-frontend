import { useEffect, useState } from "react";

function useWebsiteBoundry() {
  const [topBoundry, setTopBoundry] = useState(70);

  useEffect(() => {
    const el = getComputedStyle(document.documentElement);
    const navbarHeigh = el.getPropertyValue("--navbar-height");
    setTopBoundry(parseInt(navbarHeigh));
  }, []);

  return { top: topBoundry, bottom: 0, left: 0, right: 0 };
}

export default useWebsiteBoundry;
