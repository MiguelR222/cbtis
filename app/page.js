import { Navbar } from "@/components/navbar/Navbar";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {user
              ? `Welcome back, ${user.name.split(" ")[0]}`
              : "Welcome to cbtis"}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            {user
              ? "You are signed in. Use the navbar to navigate."
              : "Sign in or create an account to get started."}
          </p>
        </div>
      </main>
    </>
  );
}
