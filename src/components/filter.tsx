import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";


export default function FilterButton() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="py-4 px-7">
          Filter 
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="bg-white">
        <DropdownItem key="By">Assigned To You</DropdownItem>
        <DropdownItem key="To">Assigned By You</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
