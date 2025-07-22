import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
      </div>
    </div>
  );
}
