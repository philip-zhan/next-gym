"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Dumbbell, User, Users, Home, LogIn, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function FloatingNavbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-2 shadow-lg">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full",
                    pathname === "/" && "bg-accent"
                  )}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {session?.user ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Workouts
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/workouts/create" title="Create Workout">
                        Start a new workout routine
                      </ListItem>
                      <ListItem href="/workouts/history" title="Workout History">
                        View your past workouts
                      </ListItem>
                      <ListItem href="/workouts/plans" title="Training Plans">
                        Browse and follow training plans
                      </ListItem>
                      <ListItem href="/workouts/exercises" title="Exercises">
                        Exercise library and guides
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full">
                    <Users className="mr-2 h-4 w-4" />
                    Organization
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/organization/dashboard" title="Dashboard">
                        Organization overview
                      </ListItem>
                      <ListItem href="/organization/members" title="Members">
                        Manage team members
                      </ListItem>
                      <ListItem href="/organization/settings" title="Settings">
                        Organization settings
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/account/profile" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full",
                        pathname?.startsWith("/account") && "bg-accent"
                      )}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link href="/auth/sign-in" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full",
                        pathname === "/auth/sign-in" && "bg-accent"
                      )}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/auth/sign-up" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
                        pathname === "/auth/sign-up" && "bg-primary/80"
                      )}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
};

