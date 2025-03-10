export async function POST(request) {
  const { text } = await request.json()

  return Response.json(
    { message: 'Hello World', text },
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
