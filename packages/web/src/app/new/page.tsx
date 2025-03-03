"use client";
import { useState } from "react";
import styles from "../../page.module.css";
import { useMutation, gql } from "@apollo/client";
import { Pattern } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";

export default function New() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [createPattern] = useMutation(CREATE_PATTERN, {
    variables: {
      title,
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          patterns(existingPatterns = [], { readField }) {
            return [...existingPatterns, data.createPattern];
          },
        },
      });
    },
  });

  return (
    <div id={styles.newPage}>
      <h2>Create Pattern</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newPattern = (await createPattern()).data
            .createPattern as Pattern;

          router.push(`/pattern/${newPattern.id}`);
        }}
      >
        <label htmlFor="title">
          <p>Title</p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            required
            type="text"
            name="title"
            id="title"
            placeholder="Cool title"
          />
        </label>
        <button role="submit">Create</button>
      </form>
    </div>
  );
}

const CREATE_PATTERN = gql`
  mutation CreatePattern($title: String!) {
    createPattern(title: $title) {
      id
      userId
      planes {
        beads {
          x
          y
          z
          color
        }
      }
    }
  }
`;
