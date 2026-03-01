import { Stack } from "expo-router";
import { useAuthStore } from "../src/store/auth.store";

export default function RootLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Toujours afficher Splash en premier */}
      <Stack.Screen name="splash" />

      {/* Auth flow */}
      {!user ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}