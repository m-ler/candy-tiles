import { Database } from './database-types';

export type UserDb = Database['public']['Tables']['users']['Row'];
export type LevelDb = Database['public']['Tables']['levels']['Row'];
export type LevelWithUserDB = LevelDb & { user: UserDb };
