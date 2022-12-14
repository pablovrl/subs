import React from "react";
import Link from "next/link";
import { Box, Link as CLink, Text, TypographyProps } from "@chakra-ui/react";

interface NavbarLinkProps {
	text: string;
	href: string;
	onClick?: ()=> void;
	icon?: React.ReactElement;
	fontSize?: TypographyProps["fontSize"];
}

export default function NavbarLink({
	text,
	href,
	onClick,
	icon,
	fontSize,
}: NavbarLinkProps) {
	return (
		<Link href={href}>
			<CLink
				px={1.5}
				display={"flex"}
				onClick={onClick}
				_hover={{ textDecoration: "none" }}
			>
				{icon && <Box mr={2}>{icon}</Box>}
				<Text fontSize={fontSize}>{text}</Text>
			</CLink>
		</Link>
	);
}
