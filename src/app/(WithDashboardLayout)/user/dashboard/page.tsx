export default function UserDashboard() {
  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl  bg-red-700" />
        <div className="aspect-video rounded-xl bg-red-700" />
        <div className="aspect-video rounded-xl  bg-red-700" />
      </div>
      <div className="min-h-[100vh] rounded-xl bg-yellow-500  mt-4" />
    </div>
  );
}