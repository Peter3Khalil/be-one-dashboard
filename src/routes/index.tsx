import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <></>,
  onEnter() {
    window.history.replaceState({}, '', '/ar');
  },
});
