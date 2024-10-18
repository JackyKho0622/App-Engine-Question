import React from "react";
import {
  Flex,
  Heading,
  Paragraph,
  Strong,
  useCurrentTheme,
} from "@dynatrace/strato-components";
import { AppHeader, AppNavLink } from "@dynatrace/strato-components-preview";
import { Link, NavLink } from "react-router-dom";
import { Card } from "../components/Card";

export const Home = () => {
  const theme = useCurrentTheme();
  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <img
        src="./assets/Dynatrace_Logo.svg"
        alt="Dynatrace Logo"
        width={150}
        height={150}
        style={{ paddingBottom: 32 }}
      ></img>

      <Heading>App Engine Question</Heading>

      <Flex gap={48} paddingTop={64} flexFlow="wrap">
        <AppHeader>
          <AppHeader.NavItems>
            <AppHeader.NavItem as={Link} to="/Task1">
              Task1
            </AppHeader.NavItem>
            <AppHeader.NavItem as={Link} to="/Task2">
              Task2
            </AppHeader.NavItem>
            <AppHeader.NavItem as={Link} to="/Task3">
              Task3
            </AppHeader.NavItem> 
          </AppHeader.NavItems>
        </AppHeader>
      </Flex>
    </Flex>
  );
};
