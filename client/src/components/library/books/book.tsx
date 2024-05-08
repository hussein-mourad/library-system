import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
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
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardActionArea onClick={() => console.log('hello world')}> */}
      <CardMedia
        component="img"
        className="max-h-[400px]"
        height="80"
        image={book.cover_image || BookPlaceholder}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>

        <Box className="flex justify-between">

          <Link to={`/authors/${book.author}`}>
            <Typography color="text.secondary">
              {author && author.name}
            </Typography>
          </Link>
          <Typography color="text.secondary">
            {book.publication_date?.substring(0, 4)}
          </Typography>
        </Box>

        <Link to={`/categories/${book.category}`}>
          <Typography color="text.secondary">
            {category && category?.name}
          </Typography>
        </Link>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
}

export default Book;
