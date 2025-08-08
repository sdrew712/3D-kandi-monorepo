import { useEffect } from "react";
import styles from "../page.module.css";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Page({ children, className = "", title }: PageProps) {
  useEffect(() => {
    if (title) {
      document.title = `${title} - 3D Kandi Patterns`;
    }
  }, [title]);

  const pageClasses = [styles.page, className].filter(Boolean).join(" ");

  return <div className={pageClasses}>{children}</div>;
}
