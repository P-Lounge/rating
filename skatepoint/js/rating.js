import * as supabase from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let client = supabase.createClient("https://lojzwaiquprqgcdnscob.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvanp3YWlxdXBycWdjZG5zY29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0MDUzMDEsImV4cCI6MjAxMDk4MTMwMX0.bv6iyLL_Q0ZS1437SRilQVn5rZbu-B_JIX5Ma0uYEwg");

const sub = document.getElementsByClassName("notif")[0]

var deviceId = undefined;

window.onerror = (ev) => {
  Sentry.captureException(ev);
  console.log(ev);
  return true;
}

var params = new URLSearchParams(window.location.search)
if (params.has("deviceId")) {
  deviceId = params.get("deviceId");
  localStorage.setItem("deviceId", deviceId)
  if (Notification.permission === "default") {
    await client.from('subscriptions').delete().eq("device_id", deviceId)
    sub.style.display = "block";
  }
  if (Notification.permission === "denied") await client.from('subscriptions').delete().eq("device_id", deviceId);
}

const { data, error } = await client.from('data').select().order('best_score', { ascending: false })
const table = document.getElementsByClassName("rating")[0]

data.forEach(entry => {
    let row = document.createElement("tr");
    let nick = document.createElement("td");
    nick.innerText = entry.nickname;
    let best = document.createElement("td");
    best.innerText = entry.best_score;
    let last = document.createElement("td");
    last.innerText = entry.last_score;
    let total = document.createElement("td");
    total.innerText = entry.total_coins;
    row.appendChild(nick);
    row.appendChild(best);
    row.appendChild(last);
    row.appendChild(total);
    table.appendChild(row);
    table.style.display = "block"
})

sub.onclick = (ev) => {
  Notification.requestPermission().then(async (result) => {
    if (result === "granted") {
      await client.from('subscriptions').insert([{"device_id": deviceId}])
      new Notification("Thanks for subscribing!", { body: "We will notify you about changes to the rating!", icon: "./src/gameicon.png" })
    }
    sub.style.display = "none";
  })
}