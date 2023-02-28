import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database-types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
