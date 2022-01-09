import React from "react";
import { useRouter } from "next/router";
import NavLink, { LinkProps as NavLinkProps } from "next/link";

type LinkProps = NavLinkProps & {
    children?: React.ReactNode;
    activeClassName?: string;
    exact?: boolean;
    href: string;
};

const Link = ({
    href,
    exact,
    activeClassName,
    children,
    ...props
}: LinkProps) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    const chlid = React.Children.only(children) as React.ReactElement<
        React.HTMLAttributes<HTMLAnchorElement>
    >;

    return (
        <NavLink href={href} {...props}>
            {React.cloneElement(chlid, {
                className: isActive
                    ? activeClassName || ""
                    : chlid.props.className || "",
            })}
        </NavLink>
    );
};

export type { LinkProps };
export { Link };
