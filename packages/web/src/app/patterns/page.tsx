"use client";
import { useSuspenseQuery, gql } from "@apollo/client";
import { Pattern } from "../../../../core/src/types";
import { useAuth } from "@/hooks/useAuth";
import { PatternCard } from "@/components/PatternCard";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";
import Page from "@/components/Page";

export default function Patterns() {
  const { userId, loading: userLoading } = useAuth();
  const router = useRouter();

  const result = useSuspenseQuery(GET_PATTERNS);

  const patterns = (result.data as any).patterns as Pattern[];

  //todo: handle loading state

  if (!userId && !userLoading) {
    return <div>Not logged in.</div>;
  }

  return (
    <Page title="My Patterns">
      <h2 className={styles.pageTitle}>My Patterns</h2>
      <button
        onClick={() => router.push("/new")}
        className={styles.primaryButton}
        style={{ marginBottom: "2rem" }}
      >
        + Create Pattern
      </button>
      <div className={styles.patternsGrid}>
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </Page>
  );
}

const GET_PATTERNS = gql`
  query Patterns {
    patterns {
      id
      userId
      title
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
