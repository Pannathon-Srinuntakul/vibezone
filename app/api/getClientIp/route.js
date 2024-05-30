import { NextResponse } from 'next/server';
import crypto from 'crypto'

export async function GET(request) {
  const clientIp = request.headers.get('x-forwarded-for') || request.ip;
  const hashedIp = crypto.createHash('sha256').update(clientIp).digest('hex');
  return NextResponse.json({ ip: hashedIp });
}
