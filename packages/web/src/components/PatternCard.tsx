import { Pattern } from "../../../core/src/types";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation, gql } from "@apollo/client";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const router = useRouter();

  const [deletePattern] = useMutation(DELETE_PATTERN, {
    variables: {
      patternId: pattern.id,
    },
  });

  return (
    <div
      onClick={() => router.push(`/pattern/${pattern.id}`)}
      className={styles.patternCard}
    >
      <DeleteOutlineIcon
        className={styles.deleteIcon}
        onClick={(e: any) => {
          e.stopPropagation();
          deletePattern();
        }}
      />

      {pattern.title}
    </div>
  );
}

const DELETE_PATTERN = gql`
  mutation DeletePattern($patternId: ID!) {
    deletePattern(patternId: $patternId) {
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
