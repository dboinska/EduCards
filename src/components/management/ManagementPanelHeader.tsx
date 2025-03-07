import { Flex, Title } from "@mantine/core"

interface ManagementPanelHeaderProps {
  actions?: React.ReactNode
}

export const ManagementPanelHeader = ({
  children,
  actions,
}: React.PropsWithChildren<ManagementPanelHeaderProps>) => (
  <Flex justify="space-between">
    <Title order={2}>{children}</Title>
    {actions}
  </Flex>
)
