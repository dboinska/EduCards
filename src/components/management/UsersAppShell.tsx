import { AppShell, Container, Text } from "@mantine/core"
import { NavButton } from "@/components/management/NavButton"
import Layout from "@/layouts/Root.layout"

interface UsersAppShellProps {
  userPaths: any
  children: React.ReactNode
  title: string
}

export const UsersAppShell = ({ userPaths, children, title }: UsersAppShellProps) => {
  return (
    <Layout title={title}>
      <AppShell
        navbar={{ width: 300, breakpoint: "sm" }}
        padding="md"
        styles={{
          main: {
            backgroundColor: "#051b33",
            height: "calc(100vh - 56px)",
            marginTop: "56px",
            overflow: "hidden",
            width: "100vw",
          },
        }}
      >
        <AppShell.Navbar
          styles={{
            navbar: {
              backgroundColor: "#051b33",
              border: "none",
              color: "white",
              marginTop: "112px",
              height: "calc(100vh - 56px)",
              gap: "8px",
              padding: "0 16px",
            },
          }}
        >
          <Text size="lg" fw={700} mb="xl">
            Management Panel
          </Text>

          <NavButton userPaths={userPaths} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Container
            size="xl"
            style={{
              backgroundColor: "white",
              borderRadius: "1rem",
              padding: "1.5rem",
              height: "100%",
              maxHeight: "calc(100vh - 56px - 2rem)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>
    </Layout>
  )
}
