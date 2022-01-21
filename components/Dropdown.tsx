import Link from "next/link";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
interface Props {
  username: string;
}

export default function DropdownBasic({ username }: Props) {
  const [checked, setChecked] = useState(false);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="bg-slate-600 p-2 rounded text-white">
        {username}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-slate-600 p-4 rounded text-white text-center">
        <DropdownMenu.Item className="hover:bg-gray-600">
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="h-px bg-slate-300 m-2" />
        <DropdownMenu.Item>
          <Link href="/leaderboards">Leaderboards</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="h-px bg-slate-300 m-2" />
        <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
