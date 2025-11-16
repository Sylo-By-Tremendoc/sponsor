import { useMemo } from "react";

type Condition<Value = unknown> =
  | Value
  | boolean
  | null
  | undefined
  | 0
  | ""
  | []
  | Record<string, never>
  | (() => boolean)
  | (() => Value)
  | (() => Value | boolean)
  | (() => null | undefined)
  | (() => 0 | "")
  | (() => [])
  | (() => unknown);

function If<Value = unknown>({
  condition,
  children,
  fallback,
}: React.PropsWithoutRef<{
  condition: Condition<Value>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}>) {
  return useMemo(() => {
    if (condition) {
      return <>{children}</>;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    return null;
  }, [condition, fallback, children]);
}

export default If;
