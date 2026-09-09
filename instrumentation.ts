import type { Instrumentation } from "next";

type RequestErrorHandler = Instrumentation.onRequestError;
type RequestError = Parameters<RequestErrorHandler>[0];
type RequestDetails = Parameters<RequestErrorHandler>[1];
type RequestContext = Parameters<RequestErrorHandler>[2];

export function register() {
  // PostHog is initialized lazily when an error needs reporting.
}

export const onRequestError: Instrumentation.onRequestError = async (
  error: RequestError,
  request: RequestDetails,
  context: RequestContext,
) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { captureServerException } =
    await import("./lib/monitoring/posthog-server");
  await captureServerException(error, {
    routerKind: context.routerKind,
    routePath: context.routePath,
    routeType: context.routeType,
    requestMethod: request.method,
  });
};
