"use client";

const DISCORD_WIDGET_ENDPOINT =
  "https://discord.com/api/guilds/1399788921306746971/widget.json";

async function fetchDiscordInvite() {
  const res = await fetch(DISCORD_WIDGET_ENDPOINT, { cache: "no-store" });
  const body = await res.json();
  return body?.instant_invite;
}

export default async function Discord() {
  const discordLink = await fetchDiscordInvite();
  window.location.assign(discordLink);
}
