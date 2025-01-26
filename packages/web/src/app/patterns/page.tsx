"use client";
import { useSuspenseQuery, gql } from "@apollo/client";
import { Pattern } from "../../../../core/src/types";
import { useAuth } from "@/hooks/useAuth";
import { PatternCard } from "@/components/PatternCard";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";

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
    <div id={styles.patternsPage}>
      <h2>My Patterns</h2>
      <button onClick={() => router.push("/new")}>+ Create Pattern</button>
      <div>
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
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
