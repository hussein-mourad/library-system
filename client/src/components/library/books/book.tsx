import {
  Card,
  CardActionArea,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import BookPlaceholder from "@/assets/book-cover-placeholder.png";
import { useEffect } from "react";
import { Link, useGetOne } from "react-admin";

export interface Book {
  id: number;
  title: string;
  description: string;
  publication_date: string;
  cover_image: string;
  author: number;
  category: number;
}

function Book({ book }: { book: Book }) {
  const { data: author } = useGetOne('authors', { id: book.author });
  const { data: category } = useGetOne('categories', { id: book.category });

  if (!book) return null;

  return (
    <Card className="w-full max-w-96 flex flex-col">
      {/* <CardActionArea onClick={() => console.log('hello world')}> */}
      <CardMedia
        component="img"
        className="max-h-[400px]"
        height="80"
        image={book.cover_image || BookPlaceholder}
        alt="green iguana"
      />
      <CardContent className="flex-grow h-full">
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>

        <Box className="flex justify-between mb-2">
          <Typography color="text.secondary" component="a" href={`/authors/${book.author}`}>
            {author && author.name}
          </Typography>
          <Typography color="text.secondary">
            {book.publication_date?.substring(0, 4)}
          </Typography>
        </Box>

        <Chip label={category && category?.name} component="a" href={`/categories/${book.category}`} clickable variant="outlined" className="px-5" />
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions >
        <Button href={`/books/${book.id}/borrow`} size="small" color="primary" >
          Borrow
        </Button>
      </CardActions>
    </Card >
  );
}

export default Book;
