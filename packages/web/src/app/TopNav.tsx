import Link from "next/link";

export default function TopNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pattern">Pattern</Link>
        </li>
      </ul>
    </nav>
  );
}
