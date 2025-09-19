export default function POST(req: Request) {
  return new Response(JSON.stringify({ name: "Email API " + Date.now() }), {
    headers: { "Content-Type": "application/json" },
  });
}
