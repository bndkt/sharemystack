import { useEffect, useState } from "react";

import { LoadingMessage } from "./LoadingMessage";

type CustomSuspenseProps<T> = {
  data?: T;
  promise?: Promise<T>;
  fallback?: JSX.Element;
  name?: string;
  passEmpty?: boolean;
  component: (data: NonNullable<T>) => JSX.Element;
};

export function CustomSuspense<T, C = T | T[]>({
  data,
  promise,
  fallback,
  name,
  passEmpty = true,
  component,
}: CustomSuspenseProps<C>) {
  const [promiseResult, setPromiseResult] = useState<C>();

  useEffect(() => {
    promise?.then((result) => setPromiseResult(result));
  }, [promise]);

  if (data) {
    if (passEmpty ?? (Array.isArray(data) ? data.length > 0 : data)) {
      return component(data);
    } else {
      return (
        <LoadingMessage message={`No ${name} found`} showSpinner={false} />
      );
    }
  } else if (promiseResult) {
    return component(promiseResult);
  } else {
    return fallback ?? <LoadingMessage message={`Loading ${name}`} />;
  }
}
