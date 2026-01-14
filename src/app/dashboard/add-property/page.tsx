import { redirect } from 'next/navigation';

// Redirect to dashboard since the modal is now opened from the dashboard directly
export default function AddPropertyPage() {
  redirect('/dashboard');
};