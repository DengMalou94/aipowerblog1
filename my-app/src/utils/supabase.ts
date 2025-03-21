// Importing necessary functions and types from the Supabase SSR package
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { headers } from 'next/headers'

// Define a function named 'supabase' that takes a 'CookieOptions' object as input
export const supabase = async () => {
    const headersList = await headers()
    const cookie = headersList.get('cookie') || ''
    
    return createServerClient(
        // Retrieve Supabase URL from environment variables
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        // Retrieve Supabase anonymous key from environment variables
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Define a custom 'get' function to retrieve cookies by name from the cookie store
                get(name: string) {
                    return cookie.split('; ').find((row: string) => row.startsWith(`${name}=`))?.split('=')[1]
                },
            },
        }
    )
}

