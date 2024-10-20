import {
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   CardMedia,
   Chip,
   IconButton,
   Skeleton,
   Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import PublicIcon from '@mui/icons-material/Public';
import HiddenIcon from '@mui/icons-material/VisibilityOff';
import PushPinIcon from '@mui/icons-material/PushPin';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EventItem } from '@/types';

interface EventCardProps {
   eventItem: EventItem;
   pinEventToStart: (eventId: string) => void;
   unpinEvent: (eventId: string) => void;
   isSkeleton: boolean;
   hanndleOpenSnackbar: () => void;
}

const EventCard = ({ eventItem, pinEventToStart, unpinEvent, isSkeleton, hanndleOpenSnackbar }: EventCardProps) => {
   return (
      <Card
         sx={{
            minHeight: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            display: 'flex',
            borderBottom: !isSkeleton && eventItem?.isPinned ? '4px solid #488FED' : 'none',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            ':hover': {
               boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            },
         }}
      >
         {isSkeleton ? (
            <>
               <Skeleton variant="rectangular" height={120} sx={{ marginBottom: 2 }} />
               <Skeleton variant="rectangular" height={18} width={'80%'} sx={{ marginBottom: 1, marginX: '8px' }} />
               <Skeleton variant="rectangular" height={14} width={'60%'} sx={{ marginBottom: 1, marginX: '8px' }} />
               <Skeleton variant="rectangular" height={12} width={'40%'} sx={{ marginBottom: 1, marginX: '8px' }} />
            </>
         ) : (
            <>
               <div>
                  <CardActionArea onClick={() => hanndleOpenSnackbar()}>
                     <CardMedia
                        sx={{
                           height: 120,
                           transition: 'transform 0.3s ease-in-out',
                           ':hover': {
                              transform: 'scale(1.05)',
                           },
                        }}
                        image={`https://picsum.photos/seed/${eventItem?.id || '1'}/300/200`}
                     />
                  </CardActionArea>
                  <CardContent
                     sx={{
                        paddingX: 1,
                        paddingY: 1,
                        marginBottom: '-24px',
                     }}
                  >
                     {eventItem?.is_published ? (
                        <Chip
                           icon={<PublicIcon sx={{ fontSize: 'small' }} />}
                           label="Live"
                           color="success"
                           sx={{ maxHeight: 20, minHeight: 20, fontSize: 12, marginBottom: '8px' }}
                        />
                     ) : (
                        <Chip
                           icon={<HiddenIcon sx={{ fontSize: 'small' }} />}
                           label="Unpublished"
                           color="error"
                           sx={{ maxHeight: 20, minHeight: 20, fontSize: 12 }}
                        />
                     )}

                     <br />
                     <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: '600', lineHeight: 1 }}>
                        {eventItem?.name}
                     </Typography>
                     <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {eventItem?.data?.scheduled_dates?.length ? (
                           <>
                              {dayjs(eventItem?.data?.scheduled_dates[0]).format('D MMM')} to{' '}
                              {dayjs(eventItem?.data?.scheduled_dates[2]).format('D MMM')}{' '}
                              {dayjs(eventItem?.data?.scheduled_dates[2]).format('YYYY')}
                           </>
                        ) : (
                           <></>
                        )}
                     </Typography>
                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {eventItem?.data?.location_name}
                        <br />
                        {eventItem?.data?.location_address}
                     </Typography>
                  </CardContent>
               </div>

               <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 0 }}>
                  <IconButton
                     onClick={() => {
                        if (eventItem.isPinned) unpinEvent(eventItem.id);
                        else pinEventToStart(eventItem.id);
                     }}
                     sx={{ marginLeft: '-8px' }}
                     className="action-btn"
                  >
                     <PushPinIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => hanndleOpenSnackbar()} sx={{ marginRight: '-8px' }} className="action-btn">
                     <MoreVertIcon fontSize="small" />
                  </IconButton>
               </CardActions>
            </>
         )}
      </Card>
   );
};

export default EventCard;
