import { useState } from "react";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_BOOKS = gql`
  mutation createBook($input: BookInput!) {
    createBook(input: $input) {
      _id
      title
    }
  }
`;

const GET_AUTHORS = gql`
  query {
    authors {
      _id
      name
    }
  }
`;

export default function CreateBooks() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  const [createBooks] = useMutation(CREATE_BOOKS);
  const { data, loading, error } = useQuery(GET_AUTHORS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createBooks({
        variables: {
          input: formData,
        },
      });
      console.log("Book added successfully:", result);
    } catch (error) {
      console.error("Error creating the book:", error);
    }
  };
  
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>Create A Book :</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange}></input>
        <input type="text" name="description" onChange={handleChange}></input>
        <select name="author" onChange={handleChange}>
          {data.authors.map((author) => {
            return (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            );
          })}
        </select>
        <button type="submit">add</button>
      </form>
    </div>
  );
}
