function disableErrors() {
  return true;
}

window.onerror = disableErrors;

Sentry.onLoad(function() {
    Sentry.init({
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [new Sentry.BrowserTracing()],
    });
});