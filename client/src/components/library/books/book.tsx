import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  publication_date: string;
}

function Book({ book }: { book: Book }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          className="max-h-[400px]"
          height="80"
          image={book.cover_image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {book.author} - {book.publication_date.substring(0, 4)} -{" "}
            {book.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
}

export default Book;
