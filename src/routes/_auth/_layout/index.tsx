import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';

export const Route = createFileRoute('/_auth/_layout/')({
  component: App,
});

function App() {
  return (
    <div className="h-screen">
      <Button>Click here</Button>
    </div>
  );
}
