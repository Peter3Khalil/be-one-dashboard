import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';

export const Route = createFileRoute('/_auth/')({
  component: App,
});

function App() {
  return (
    <div>
      <Button>Click here</Button>
    </div>
  );
}
