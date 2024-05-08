
import { useEffect, useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { GetListParams, Link, useGetList } from "react-admin";
import jwtTokenAuthProvider, { fetchJsonWithAuthJWTToken } from "@/providers/auth-provider";
import drfProvider from "@/providers/drf-provider";

function IndexPage() {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const authProvider = jwtTokenAuthProvider({
    obtainAuthTokenUrl: `${apiUrl}/token/`,
    refreshTokenUrl: `${apiUrl}/token/refresh/`,
  });
  const dataProvider = drfProvider(apiUrl, fetchJsonWithAuthJWTToken);

  // const [books, setBooks] = useState([]);
  //
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const params: GetListParams = { filter: {}, pagination: { page: 1, perPage: 10 }, sort: { field: "id", order: "ASC" } };
  //       const { data } = await dataProvider.getList('books', params);
  //       setBooks(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //
  //   fetchBooks();
  // }, []);



  return (
    <div>
      <Typography variant="h4">Hello world</Typography>
      <Link to="/admin">Admin Page</Link>
      <Grid container gap={3}>
        {books && books.map((book: any) => (
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
                  {book.author} - {book.publication_date.substring(0, 4)} - {book.category}
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
        ))}
      </Grid>
    </div>
  );
}

export default IndexPage;
