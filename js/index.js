Sentry.onLoad(function() {
    Sentry.init({
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [new Sentry.BrowserTracing()],
    });
});

window.onerror = (ev) => {
  Sentry.captureException(ev);
  console.log(ev);
  return true;
}