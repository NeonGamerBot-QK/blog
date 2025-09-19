export async function GET(req: Request) {
    return new Response(JSON.stringify({ name: "John Doe " + Date.now() }), {
        headers: { "Content-Type": "application/json" },
    });
}