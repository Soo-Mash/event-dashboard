type EventData = {
   location_name?: string;
   location_address?: string;
   scheduled_dates?: string[];
};

export type EventItem = {
   id: string;
   name: string;
   slug: string;
   is_published: number;
   is_public: number;
   is_guestlist_only: number;
   created_at: string;
   updated_at: string;
   deleted_at: string | null;
   data: EventData | null;
   isPinned: boolean;
};

export type PaginationType = {
   perPage: number;
   currentPage: number;
   lastPage: number;
   total: number;
};

export type EventsResponse = {
   success: boolean;
   code: number;
   message: string;
   data: {
      events: EventItem[];
      pagination: PaginationType;
   };
};
