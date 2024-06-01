import { createClient } from '@/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore )
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      // TODO: redirect to error page with error message
      return NextResponse.redirect(new URL('/auth/signup', req.url))
    }
  }

  return NextResponse.redirect(new URL('/dashboard', req.url))
}