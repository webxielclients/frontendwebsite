export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch('https://api.usechangpay.com/v1/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.WAITLIST_API_KEY!,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}