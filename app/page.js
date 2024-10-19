
import RootComponent from "@/components/rootComponent";



const initialTasks = [
  { id: 1, title: 'Complete Josh Talks Assignment', description: 'Task Management App for Josh Talks', priority: 'high', completed: true },
  { id: 2, title: 'Learn Next js', description: 'Next js', priority: 'medium', completed: false },
  { id: 3, title: 'Learn New Trending Technologies', description: 'Amazing New Technologies', priority: 'low', completed: false },
];

export default function Home() {
  return (
    
    <>

    <RootComponent initialTasks={initialTasks} />


    </>  );
}


