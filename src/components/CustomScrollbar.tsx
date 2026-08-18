"use client";

import { useEffect } from "react";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbars } from "overlayscrollbars";

export default function CustomScrollbar({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: "os-theme-custom",
        autoHide: "scroll",
        autoHideDelay: 400,
        autoHideSuspend: false,
        clickScroll: true,
      },
    });

    return () => {
      if (osInstance && osInstance.destroy) {
        osInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
