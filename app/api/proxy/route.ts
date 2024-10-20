import { NextResponse } from 'next/server';
// Created a proxy server to avoid CORS error when attempting to fetch data from API
export async function GET() {
   const apiUrl = 'https://www.eventogy.com/api/events.json';

   try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
   }
}
