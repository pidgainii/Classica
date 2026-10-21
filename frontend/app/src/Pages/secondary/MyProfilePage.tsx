import { useAuthContext } from "../../Contexts/AuthContext";

export default function MyProfilePage() {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <ul className="max-w-xs w-full flex flex-col">
        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-layer border border-layer-line text-layer-foreground -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          Email: {user?.email}
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-layer border border-layer-line text-layer-foreground -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          First Name: {user?.first_name}
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-layer border border-layer-line text-layer-foreground -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          Last Name: {user?.last_name}
        </li>
      </ul>
    </div>
  );
}
