import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  // useEffect(() => {
  //   router.replace("/login" as any);
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Text>Heheh/index.tsx to edit this screen.</Text>
  //   </View>
  // );
}
