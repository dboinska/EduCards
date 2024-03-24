import { Group, Box, Text, rem, Flex } from "@mantine/core"
import styles from "src/styles/Catalogs.module.css"

import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"

const DragAndDrop = () => {
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      classNames={{ inner: styles.mantineDropzoneInner }}
    >
      <Flex>
        <Group wrap="nowrap" justify="left" gap="sm" style={{ pointerEvents: "none" }}>
          <Group>
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1}
              />
            </Dropzone.Idle>
          </Group>
          <Box>
            <Text size="sm" inline>
              Drag images here or click to select files for catalog's background.
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              File should not exceed 5mb.
            </Text>
          </Box>
        </Group>
      </Flex>
    </Dropzone>
  )
}

export default DragAndDrop
