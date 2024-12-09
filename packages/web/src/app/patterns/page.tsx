"use client";
import { useSuspenseQuery, gql } from "@apollo/client";
import { Pattern } from "../../../../core/src/types";
import { useAuth } from "@/utils/useAuth";
import { PatternCard } from "@/components/PatternCard";
import styles from "../../page.module.css";

export default function Patterns() {
  const { userId, loading: userLoading } = useAuth();

  const result = useSuspenseQuery(GET_PATTERNS);

  const patterns = (result.data as any).patterns as Pattern[];

  if (!patterns || patterns.length === 0 || userLoading) {
    return <div>Loading...</div>;
  }

  if (!userId && !userLoading) {
    return <div>Not logged in.</div>;
  }

  return (
    <div id={styles.patternsPage}>
      {patterns.map((pattern) => (
        <PatternCard key={pattern.id} pattern={pattern} />
      ))}
    </div>
  );
}

const GET_PATTERNS = gql`
  query Patterns {
    patterns {
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
