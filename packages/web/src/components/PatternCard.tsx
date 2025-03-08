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
    update(cache) {
      cache.modify({
        fields: {
          patterns(existingPatterns = [], { readField }) {
            return existingPatterns.filter(
              (patternRef: any) => pattern.id !== readField("id", patternRef)
            );
          },
        },
      });
    },
  });

  function handleClickDeletePattern(e: any) {
    e.stopPropagation();
    const confirmed = window.confirm(
      "Are you sure you want to delete this pattern?"
    );
    if (confirmed) {
      deletePattern();
    }
  }

  return (
    <div
      onClick={() => router.push(`/pattern/${pattern.id}`)}
      className={styles.patternCard}
    >
      <button className={styles.deleteIcon}>
        <DeleteOutlineIcon
          className={styles.deleteIcon}
          fontSize="small"
          onClick={handleClickDeletePattern}
        />
      </button>

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
