import { createClient } from '@supabase/supabase-js';
import Header from '../components/Header';
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);



// Define an asynchronous function named 'getArticles' that retrieves article data based on the provided parameters
async function getArticles(params: any) {
    // Extract the 'id' parameter from the provided 'params' object
    const { id } = params

    // Retrieve article data from Supabase database where the 'id' matches the provided value
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

    // Return the retrieved data
    return data
  }