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
        <Dropdown.Item icon={<IconClipboard />} key={1}>
          {/* <Typography.Text>Dashboard</Typography.Text> */}
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Dropdown.Item>,
        <Dropdown.Item icon={<IconCopy />} key={2}>
          <Typography.Text key={3}>Settings</Typography.Text>
        </Dropdown.Item>,
        <Divider light key={4} />,
        <Dropdown.Item key={5} icon={<IconLogOut />}>
          <Typography.Text key={6}>Log out</Typography.Text>
        </Dropdown.Item>,
        <Divider light key={7} />,
        <Dropdown.Checkbox checked={checked} onChange={setChecked} key={8}>
          <Typography.Text key={9}>Color Blind</Typography.Text>
        </Dropdown.Checkbox>,
      ]}
    >
      <Button className="bg-orange-400">{username}</Button>
    </Dropdown>
  );
}
