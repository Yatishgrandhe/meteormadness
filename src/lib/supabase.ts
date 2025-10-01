import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://samapeevfikxeesbcvee.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhbWFwZWV2ZmlreGVlc2JjdmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzg3OTYsImV4cCI6MjA3NDg1NDc5Nn0.Jdu2IQvoGJJDUOWr3sGSkAeng2WPkdA4EmZSVEntv44';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface SponsorSubmission {
  id: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  sponsorship_level: string;
  message: string | null;
  status: 'new' | 'contacted' | 'confirmed';
}

// Database operations
export const sponsorSubmissions = {
  // Get all submissions
  async getAll() {
    const { data, error } = await supabase
      .from('sponsor_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create new submission
  async create(submission: Omit<SponsorSubmission, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('sponsor_submissions')
      .insert([submission])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update submission
  async update(id: string, updates: Partial<SponsorSubmission>) {
    const { data, error } = await supabase
      .from('sponsor_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete submission
  async delete(id: string) {
    const { error } = await supabase
      .from('sponsor_submissions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
