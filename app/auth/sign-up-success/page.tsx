import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>Confirm your address to finish signing up.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">
          Your account has been created. Open the confirmation link in your
          email, then sign in to access the workspace.
        </p>
      </CardContent>
    </Card>
  );
}
