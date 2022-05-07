import React from "react";
import Link from "next/link";
import { Box, Link as CLink, Text, TypographyProps } from "@chakra-ui/react";

interface NavbarLinkProps {
	text: string;
	href: string;
	icon?: React.ReactElement;
	fontSize?: TypographyProps["fontSize"];
}

export default function NavbarLink({
	text,
	href,
	icon,
	fontSize,
}: NavbarLinkProps) {
	return (
		<>
			<Link href={href}>
				<CLink
					display={"flex"}
					alignItems={"center"}
					_hover={{ textDecoration: "none" }}
				>
					{icon && <Box mr={2}>{icon}</Box>}
					<Text fontSize={fontSize}>{text}</Text>
				</CLink>
			</Link>
		</>
	);
}
