import { NextRequest, NextResponse } from "next/server";

 
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  setUrlCookie(request, response);

  return response
}



const setUrlCookie = (request: NextRequest, response: NextResponse): void => {
  response.headers.set('urlPathHeader', request.nextUrl.pathname);
}