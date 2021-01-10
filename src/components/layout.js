import React from "react";
import { Box, styled } from "@material-ui/core";

const Container = styled(Box)({
  height: "100vh",
  overflow: "hidden",
});

function Layout({ children }) {
  return <Container>{children}</Container>;
}

export default Layout;
