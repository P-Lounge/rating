window.onerror = (ev) => {
  Sentry.captureException(ev);
  console.log(ev);
  return true;
}