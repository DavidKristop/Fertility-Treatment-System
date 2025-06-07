import { CardHeader, CardTitle } from "@/components/ui/card";

interface AuthHeaderProps {
  title: string;
}

export default function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <CardHeader className="pb-1">
      <CardTitle className="text-2xl text-center font-bold">{title}</CardTitle>
    </CardHeader>
  );
}
