"use client";
import { useSuspenseQuery, gql } from "@apollo/client";
import { Pattern } from "../../../../core/src/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/useAuth";

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
    <div>
      {patterns.map((pattern) => (
        <PatternCard key={pattern.id} pattern={pattern} />
      ))}
    </div>
  );
}

function PatternCard({ pattern }: { pattern: Pattern }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/pattern/${pattern.id}`)}>
      <div>{pattern.id}</div>
      <div>{JSON.stringify(pattern.planes)}</div>
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
