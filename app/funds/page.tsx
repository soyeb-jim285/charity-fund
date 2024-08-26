import { Button } from "@/components/ui/button";
import { useNewFund } from "@/feature/funds/hook/use-new-fund";

export default function Home() {
  return (
    <div>
      <Button>Add a new fund</Button>
    </div>
  );
}
