import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query {
    authors {
      _id
      name
      books {
        _id
        title
        description
      }
    }
  }
`;

export default function GetData() {
  const { data, loading, error } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>List of Authors with their Books :</h1>
      <ul>
        {data.authors.map((author) => (
          <li key={author._id}>
            {author.name} - Books:
            <ul>
              {author.books.map((book) => (
                <li key={book._id}>
                  {book.title} - {book.description}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
