self.addEventListener("install", async event => {
  console.log("Service worker installed");
  self.skipWaiting();
  clients.claim();
});
self.addEventListener("activate", async event => {
  console.log("Service worker activated");
  await self.registration.showNotification("Thanks for subscribing!", { body: "We will notify you about changes to the rating!", icon: "./src/gameicon.png" });
});

self.addEventListener("fetch", event => {
  console.log('WORKER: Fetching', event.request);
});