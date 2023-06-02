/** @format */

import { ReactNode } from "react";
import { Layout } from "antd";

const { Content, Footer } = Layout;

export const AppLayout = ({
  children,
}: // auth,
{
  auth: boolean;
  children: ReactNode;
}) => {
  return (
    <>
      <Layout>
        <Content className="main-content">{children}</Content>
        <Footer className="footer">©{new Date().getFullYear()} SeeBiz. All Rights Reserved.</Footer>
      </Layout>
    </>
  );
};
