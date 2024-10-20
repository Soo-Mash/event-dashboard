'use client';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { EventItem, EventsResponse, PaginationType } from '@/types';
import EventCard from '../EventCard/EventCard';
import {
   Box,
   Button,
   FormControl,
   MenuItem,
   Pagination,
   Select,
   SelectChangeEvent,
   Stack,
   TextField,
   Typography,
} from '@mui/material';

interface EventCardListProps {
   hanndleOpenSnackbar: () => void;
}

const EventCardList = ({ hanndleOpenSnackbar }: EventCardListProps) => {
   const [events, setEvents] = useState<EventItem[]>([]);
   const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
   const [sortType, setSortType] = useState<string>('created_at');
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [paginationInfo, setPaginationInfo] = useState<PaginationType>();
   const [loading, setLoading] = useState<boolean>(false);

   const fetchEvents = async () => {
      setLoading(true);
      try {
         const response = await fetch('/api/proxy');
         const data: EventsResponse = await response.json();
         const eventsList = data.data.events;
         setEvents(eventsList);
         setFilteredEvents(eventsList);
         setPaginationInfo(data.data.pagination);
         setLoading(false);
      } catch (error) {
         console.error('Error fetching events:', error);
         setLoading(false);
      }
   };

   const pinEventToStart = (eventId: string) => {
      setEvents((prevEvents) => {
         const eventIndex = prevEvents.findIndex((event) => event.id === eventId);
         if (eventIndex !== -1) {
            const eventToPin = prevEvents[eventIndex];
            eventToPin.isPinned = true;
            const updatedEvents = [...prevEvents];
            updatedEvents.splice(eventIndex, 1);
            updatedEvents.unshift(eventToPin);
            return updatedEvents;
         }
         return prevEvents;
      });
   };

   const unpinEvent = (eventId: string) => {
      setEvents((prevEvents) => {
         const updatedEvents = [...prevEvents];
         const eventIndex = updatedEvents.findIndex((event) => event.id === eventId);
         if (eventIndex !== -1) {
            const eventToUnpin = { ...updatedEvents[eventIndex], isPinned: false };
            updatedEvents.splice(eventIndex, 1);
            const lastPinnedIndex = updatedEvents.reduce(
               (lastIndex, event, index) => (event.isPinned ? index : lastIndex),
               -1,
            );
            updatedEvents.splice(lastPinnedIndex + 1, 0, eventToUnpin);
         }
         return updatedEvents;
      });
   };

   const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      if (query === '') {
         setFilteredEvents(events);
      } else {
         const filtered = events.filter(
            (event) =>
               event.name.toLowerCase().includes(query.toLowerCase()) ||
               event?.data?.location_name?.toLowerCase().includes(query.toLowerCase()) ||
               event?.data?.location_address?.toLowerCase().includes(query.toLowerCase()),
         );
         setFilteredEvents(filtered);
      }
   };

   const sortEvents = (events: EventItem[], sortType: string) => {
      const pinned = events.filter((event) => event.isPinned);
      const unpinned = events.filter((event) => !event.isPinned);
      unpinned.sort((a, b) => new Date(b[sortType]).getTime() - new Date(a[sortType]).getTime());
      return [...pinned, ...unpinned];
   };

   const handleSortTypeChange = (event: SelectChangeEvent) => {
      setSortType(event.target.value);
   };

   useEffect(() => {
      fetchEvents();
   }, []);

   useEffect(() => {
      const sortedEvents = sortEvents(events, sortType);
      setEvents(sortedEvents);
   }, [sortType]);
   return (
      <Box sx={{ minHeight: '200px' }}>
         <Typography variant="h6" sx={{ color: 'text.primary', marginBottom: 1, display: { xs: 'block', sm: 'none' } }}>
            Events ({paginationInfo?.total || 0})
         </Typography>
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: 'text.primary', display: { xs: 'none', sm: 'block' } }}>
               Events ({paginationInfo?.total || 0})
            </Typography>
            <Grid container spacing={1}>
               <Grid>
                  <TextField variant="outlined" size="small" placeholder="Search" onChange={handleSearchQueryChange} />
               </Grid>
               <Grid>
                  <FormControl sx={{ minWidth: 150, maxWidth: 150 }} size="small">
                     <Select value={sortType} onChange={handleSortTypeChange} disabled={Boolean(searchQuery?.length)}>
                        <MenuItem value="created_at">Created at</MenuItem>
                        <MenuItem value="updated_at">Last modified</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
            </Grid>
         </Box>

         <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{ paddingTop: 3, paddingBottom: 3 }}
         >
            {(loading ? Array.from(new Array(8)) : searchQuery ? filteredEvents : events)?.map((event, index) => (
               <Grid key={index + 1} size={{ xs: 12, sm: 3 }}>
                  <EventCard
                     eventItem={event}
                     pinEventToStart={pinEventToStart}
                     unpinEvent={unpinEvent}
                     isSkeleton={loading}
                     hanndleOpenSnackbar={hanndleOpenSnackbar}
                  />
               </Grid>
            ))}
         </Grid>
         <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Pagination
               count={paginationInfo?.lastPage}
               page={paginationInfo?.currentPage || 1}
               onChange={() => {
                  hanndleOpenSnackbar();
               }}
            />
         </Stack>
      </Box>
   );
};

export default EventCardList;
