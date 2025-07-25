import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { headers } from 'next/headers';

export const supabase = async () => {
    try {
        // Retrieve headers and log them for debugging
        const headersList = await headers();
        console.log('Headers:', headersList);

        // Retrieve the cookie header and log it
        const cookie = headersList.get('cookie') || '';
        console.log('Cookie:', cookie);

        // Log environment variables to ensure they are correctly set
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Key is set' : 'Key is missing');

        // Initialize the Supabase client
        const client = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookie
                            .split('; ')
                            .find((row: string) => row.startsWith(`${name}=`))
                            ?.split('=')[1];
                    },
                },
            }
        );

        // Log success message
        console.log('Supabase client initialized successfully');
        return client;
    } catch (error) {
        // Log any errors that occur during initialization
        console.error('Error initializing Supabase client:', error);
        throw error;
    }
};