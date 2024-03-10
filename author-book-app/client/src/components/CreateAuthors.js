import { useState } from "react";
import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_AUTHOR = gql`
  mutation createAuthor($input: AuthorInput!) {
    createAuthor(input: $input) {
      _id
      name
    }
  }
`;


export default function CreateAuthors() {
  const [nameInp, setName] = useState("");

  const [createAuthor] = useMutation(CREATE_AUTHOR);

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(nameInp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createAuthor({
        variables: {
          input: { name: nameInp },
        },  
      });
      console.log("Author added successfully:", result);
    } catch (error) {
      console.log("Error creating author:", error);
    }
    setName("");
  };

  return (
    <div>
      <h1>Create An Author :</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange}></input>
        <button type="submit">add</button>
      </form>
    </div>
  );
}
