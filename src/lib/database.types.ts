export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          user_id: string;
          destination: string;
          title: string;
          description: string | null;
          start_date: string | null;
          end_date: string | null;
          itinerary: string | null;
          budget: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          destination: string;
          title: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          itinerary?: string | null;
          budget?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          destination?: string;
          title?: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          itinerary?: string | null;
          budget?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trip_places: {
        Row: {
          id: string;
          trip_id: string;
          name: string;
          description: string | null;
          place_type: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          name: string;
          description?: string | null;
          place_type?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          name?: string;
          description?: string | null;
          place_type?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}