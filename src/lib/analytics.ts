type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export function trackEvent(event: AnalyticsEvent) {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!analyticsId || typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("portfolio:analytics", {
      detail: { analyticsId, ...event }
    })
  );
}
