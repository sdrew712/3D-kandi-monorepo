"use client";
import { useState } from "react";
import styles from "../../page.module.css";
import { useMutation, gql } from "@apollo/client";
import { Pattern } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Page from "@/components/Page";

export default function New() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    onError() {
      alert("Something went wrong creating your pattern :(");
      setIsLoading(false);
    },
  });

  return (
    <Page title="Create Pattern">
      <h2 className={styles.pageTitle}>Create Pattern</h2>
      <form
        className={styles.pageForm}
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);

          try {
            const newPattern = (await createPattern()).data
              .createPattern as Pattern;

            router.push(`/pattern/${newPattern.id}`);
          } catch (error) {
            setIsLoading(false);
          }
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
            disabled={isLoading}
            className={styles.pageInput}
          />
        </label>
        <Button
          text="Create"
          isLoading={isLoading}
          loadingText="Creating pattern..."
        />
      </form>
    </Page>
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
