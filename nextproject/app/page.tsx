import Posts from "./components/posts/posts";
import LayoutApp from "./components/layoutapp/layoutApp";

export default async function Home() {
  return (
    <main className="flex  w-full  flex-col items-center justify-center justify-between text-black font-sans">
      <LayoutApp>
        <Posts />
        
      </LayoutApp>
    </main>
  );
}
