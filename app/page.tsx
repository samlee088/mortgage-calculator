import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1>Mortgage calculator</h1>
      <Calculator />
    </main>
  );
}
