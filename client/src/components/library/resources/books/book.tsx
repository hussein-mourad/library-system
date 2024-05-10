import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import BookPlaceholder from "@/assets/book-cover-placeholder.png";
import { useGetOne } from "react-admin";

export interface Book {
  id: number;
  title: string;
  description: string;
  year: number;
  cover: string;
  author: number;
  category: number;
}

export interface Borrow {
  id: number;
  book: number;
  user: number;
  borrow_date: Date;
  return: false;
}

function Book({ book, borrow }: { book: Book; borrow?: Borrow }) {
  const { data: author } = useGetOne("authors", { id: book.author });
  const { data: category } = useGetOne("categories", { id: book.category });

  if (!book) return null;

  return (
    <Card className="w-full max-w-96 flex flex-col">
      {/* <CardActionArea onClick={() => console.log('hello world')}> */}
      <CardMedia
        component="img"
        className="max-h-[400px]"
        height="80"
        image={book.cover || BookPlaceholder}
        alt="book cover"
      />
      <CardContent className="flex-grow h-full">
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>

        <Box className="flex justify-between mb-2">
          <Typography
            color="text.secondary"
            component="a"
            href={`/books/?filter={"author":${book.author}}`}
          >
            {author && author.name}
          </Typography>
          <Typography color="text.secondary">{book.year}</Typography>
        </Box>

        <Chip
          label={category && category?.name}
          component="a"
          href={`/books/?filter={"category":${book.category}}`}
          clickable
          variant="outlined"
          className="px-5"
        />
      </CardContent>
      <CardActions>
        {borrow ? (
          <Button
            href={`/borrows/${borrow.id}/return`}
            size="small"
            color="primary"
          >
            Return
          </Button>
        ) : (
          <Button
            href={`/books/${book.id}/borrow`}
            size="small"
            color="primary"
          >
            Borrow
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Book;
