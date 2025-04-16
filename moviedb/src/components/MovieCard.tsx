import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../styles/MovieList.css';


interface Movie {
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number | null;
    
  }
 
  interface MovieCardProps {
    movie: Movie;
  }
  
  const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
      <Card sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: 3,
        borderRadius: 2,
        ':hover': {
          boxShadow: 5,
        },
        

    
      }}
      >
        <CardMedia 
        component= "img"
        image={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
        alt={movie.title}
            sx={{ 
                height: 430,
                objectFit: 'cover',
                width: '100%'

            }}/>

            <CardContent sx={{ flexGrow: 1, padding: 1}}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold'}}>
  {movie.title}
</Typography>
                <Typography variant='body2' color='text.secondary'>
                Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} /10
                </Typography>
            </CardContent>


        
        </Card>
    );
    
}
  
export default MovieCard;