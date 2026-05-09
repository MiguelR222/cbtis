import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * Displays a circular avatar with the user's first initial.
 * @param {{ name: string, className?: string }} props
 */
export function UserAvatar({ name, className }) {
  const initial = name?.charAt(0).toUpperCase() ?? "?";

  return (
    <Avatar className={className}>
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}
