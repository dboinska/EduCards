import { AppShell, Burger, Group, Skeleton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

interface ManagementPanelLayoutProps {
  header: React.ReactNode
  navbar: React.ReactNode
}

export const ManagementPanelLayout = ({
  children,
  navbar,
}: React.PropsWithChildren<ManagementPanelLayoutProps>) => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Educards
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">{navbar}</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
