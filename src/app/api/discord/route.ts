const DISCORD_WIDGET_ENDPOINT =
  "https://discord.com/api/guilds/1399788921306746971/widget.json";

const getDiscordInviteUrl = async () => {
  // Fetch the instant invite link from the Discord widget
  const res = await fetch(DISCORD_WIDGET_ENDPOINT);
  const body = await res.json();
  return body?.instant_invite;
};

export async function GET() {
  const discordInviteLink = await getDiscordInviteUrl();
  return new Response(JSON.stringify({ invite_link: discordInviteLink }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
