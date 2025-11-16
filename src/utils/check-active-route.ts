export const checkActive = (pathname: string, route: string) => {
  if (route === "/") {
    return pathname === route;
  }
  return pathname.startsWith(route);
};