import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);
}
