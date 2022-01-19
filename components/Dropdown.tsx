import {
  Button,
  Divider,
  Dropdown,
  IconClipboard,
  IconCopy,
  IconLogOut,
  IconTrash,
  Typography,
} from "@supabase/ui";
import Link from "next/link";
import { useState } from "react";

interface Props {
  username: string;
}

export default function DropdownBasic({ username }: Props) {
  const [checked, setChecked] = useState(false);
  return (
    <Dropdown
      overlay={[
        <Dropdown.Item icon={<IconClipboard />}>
          {/* <Typography.Text>Dashboard</Typography.Text> */}
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Dropdown.Item>,
        <Dropdown.Item icon={<IconCopy />}>
          <Typography.Text>Settings</Typography.Text>
        </Dropdown.Item>,
        <Divider light />,
        <Dropdown.Item icon={<IconLogOut />}>
          <Typography.Text>Log out</Typography.Text>
        </Dropdown.Item>,
        <Divider light />,
        <Dropdown.Checkbox checked={checked} onChange={setChecked}>
          <Typography.Text>Color Blind</Typography.Text>
        </Dropdown.Checkbox>,
      ]}
    >
      <Button className="bg-orange-400">{username}</Button>
    </Dropdown>
  );
}
