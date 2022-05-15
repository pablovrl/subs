import React from "react";
import Link from "next/link";
import {
	Button,
	Box,
	Text,
	Link as CLink,
	TypographyProps,
} from "@chakra-ui/react";

interface ButtonLinkProps {
	text: string;
	href: string;
	icon?: React.ReactElement;
	fontSize?: TypographyProps["fontSize"];
}

export default function ButtonLinkProps({
	text,
	href,
	icon,
	fontSize,
}: ButtonLinkProps) {
	return (
		<Link href={href}>
			<Button>
				<CLink
					display={"flex"}
					alignItems={"center"}
					_hover={{ textDecoration: "none" }}
				>
					{icon && <Box mr={2}>{icon}</Box>}
					<Text fontSize={fontSize}>{text}</Text>
				</CLink>
			</Button>
		</Link>
	);
}
