import { Modal } from "@mantine/core"
import { UserStatisticsView } from "@/modules/user/views/userStatistics.view"

interface UserStatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  userId?: string
}

export const UserStatisticsModal = ({ isOpen, onClose, userId }: UserStatisticsModalProps) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Learning Statistics" centered size="1000px">
      <UserStatisticsView id={userId} />
    </Modal>
  )
}
