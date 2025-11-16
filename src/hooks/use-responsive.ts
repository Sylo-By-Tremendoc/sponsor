import { useEffect, useState } from "react";

interface DeviceSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideDesktop: boolean;
  currentWidth: number;
}

const useResponsive = (): DeviceSize => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isWideDesktop: false,
    currentWidth: window.innerWidth,
  });

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    const isMobile = currentWidth < 768;
    const isTablet = currentWidth >= 768 && currentWidth < 992;
    const isDesktop = currentWidth >= 992 && currentWidth < 1200;
    const isWideDesktop = currentWidth >= 1200;

    setDeviceSize({
      isMobile,
      isTablet,
      isDesktop,
      isWideDesktop,
      currentWidth,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceSize;
};

export default useResponsive;
