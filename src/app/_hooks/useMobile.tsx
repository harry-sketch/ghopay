import { useEffect, useState } from "react";

import { useWindowSize } from "usehooks-ts";
import { isMobileDevice } from "~/app/_utils";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { width } = useWindowSize();

  const isMob = width <= 480;

  useEffect(() => {
    if (isMobileDevice() || isMob) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [isMob]);

  return { isMobile };
};
