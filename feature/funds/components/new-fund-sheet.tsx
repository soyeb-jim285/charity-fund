import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewFund } from "../hook/use-new-fund";

export const NewFundSheet = () => {
  const { isOpen, onClose } = useNewFund();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create a new fund</SheetTitle>
        </SheetHeader>
      </SheetContent>
      <SheetContent>
        <SheetDescription>
          Create a new Charity Fund to start raising money for those in need.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
