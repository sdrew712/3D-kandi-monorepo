"use client";
import { useSuspenseQuery, gql } from "@apollo/client";
import { Pattern } from "../../../../core/src/types";
import { useRouter } from "next/navigation";

export default function Patterns() {
  const patterns = getPatterns();
  if (!patterns) {
    return <div>Loading...</div>;
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

function getPatterns(): Pattern[] {
  const result = useSuspenseQuery(GET_PATTERN, {
    variables: {
      //todo: get all patterns for user
      patternId: "eQ71dQ1scxh5T1nivXQ_-",
    },
  });
  return [(result.data as { pattern: Pattern }).pattern];
}

const GET_PATTERN = gql`
  query Query($patternId: ID!) {
    pattern(id: $patternId) {
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
