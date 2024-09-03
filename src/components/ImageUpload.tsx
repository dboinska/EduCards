import { useEffect, useState } from "react"
import { Box, Flex, Group, Text, rem, Image, SimpleGrid } from "@mantine/core"
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"

import styles from "src/styles/Catalogs.module.css"

import type { FileWithPath, DropzoneProps } from "@mantine/dropzone"

interface ImageUploadProps extends DropzoneProps {
  onRemove: () => void
}

export const ImageUpload = ({
  onDrop,
  onReject,
  onRemove,
  maxSize,
  accept,
  ...props
}: ImageUploadProps) => {
  const [files, setFiles] = useState<FileWithPath[]>([])

  const maxFileSize = maxSize ?? 5 * 1024 ** 2
  const acceptType = accept ?? IMAGE_MIME_TYPE

  const fileHeight = "200px"

  const removeCard = (index, event) => {
    event.preventDefault()
    event.stopPropagation()
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    onRemove?.()
  }

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <div key={index} style={{ position: "relative" }}>
        <Image
          mah={fileHeight}
          w="100%"
          style={{ objectFit: "cover", objectPosition: "center" }}
          key={index}
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          alt=""
        />
        <IconX
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: 99999,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
          onClick={(event) => removeCard(index, event)}
        />
      </div>
    )
  })

  const handleOnDrop = (files) => {
    setFiles(files)
    onDrop?.(files)
  }

  const handleOnReject = (files) => {
    onReject?.(files)
    console.log("rejected files", files)
  }

  return (
    <Dropzone
      onDrop={handleOnDrop}
      onReject={handleOnReject}
      maxSize={maxFileSize}
      accept={acceptType}
      classNames={{ inner: styles.mantineDropzoneInner }}
      w="100%"
      {...props}
    >
      <Flex mah={fileHeight} w="100%">
        <Group wrap="nowrap" justify="left" gap="sm" w="100%" style={{ pointerEvents: "none" }}>
          <Group
            justify="start"
            style={{ alignSelf: "flex-start", display: files.length > 0 ? "none" : "flex" }}
          >
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
                  margin: "var(--mantine-spacing-xs)",
                }}
                stroke={1}
              />
            </Dropzone.Idle>
          </Group>
          <Box w="100%">
            {files.length > 0 ? (
              <SimpleGrid w="100%" style={{ overflow: "hidden" }}>
                {previews}
              </SimpleGrid>
            ) : (
              <Box p="var(--mantine-spacing-xs)">
                <Text size="sm" inline>
                  Drag images here or click to select files for catalog&apos;s background.
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  File should not exceed 5mb.
                </Text>
              </Box>
            )}
          </Box>
        </Group>
      </Flex>
    </Dropzone>
  )
}
