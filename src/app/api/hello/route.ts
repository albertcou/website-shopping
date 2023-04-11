async function Hello(request: Request) {
  return new Response('Hello, Next.js!')
}

export {Hello as GET}
