import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/root")}>
      root
    </button>
  );
}
