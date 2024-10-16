import { useEffect, useState } from "react"
import {
  Box,
  Flex,
  Group,
  Text,
  rem,
  Image,
  SimpleGrid,
  useMantineTheme,
  Container,
} from "@mantine/core"
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"

import styles from "src/styles/Catalogs.module.css"

import type { FileWithPath, DropzoneProps } from "@mantine/dropzone"

interface ImageUploadProps extends DropzoneProps {
  onRemove: () => void
  hidePreview?: boolean
  label?: string
  existingImageUrl?: any
}

export const ImageUpload = ({
  onDrop,
  onReject,
  onRemove,
  maxSize,
  accept,
  placeholder,
  hidePreview,
  label,
  existingImageUrl,
  ...props
}: ImageUploadProps) => {
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(existingImageUrl || null)

  const maxFileSize = maxSize ?? 5 * 1024 ** 2
  const acceptType = accept ?? IMAGE_MIME_TYPE

  const fileHeight = "200px"

  const removeCard = (index?: number, event?: React.MouseEvent) => {
    event?.preventDefault()
    event?.stopPropagation()
    if (index !== undefined) {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    } else {
      setImageUrl(null)
    }

    onRemove?.()
  }

  useEffect(() => {
    console.log({ files })
  }, [files])

  useEffect(() => {
    console.log("ImageUpload props:", { onDrop, onReject, onRemove, files })
  }, [onDrop, onReject, onRemove, files])

  const theme = useMantineTheme()

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
    <Container p="0" w="100%">
      {label && <label>{label}</label>}
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
              style={{
                alignSelf: "flex-start",
                display: files.length > 0 || (existingImageUrl && imageUrl) ? "none" : "flex",
              }}
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
                  }}
                  stroke={1}
                />
              </Dropzone.Idle>
            </Group>
            <Box w="100%">
              {hidePreview && files.length > 0 ? (
                <Flex gap="lg" align="center">
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-green-6)",
                      padding: `${theme.spacing.sm}`,
                    }}
                    stroke={1}
                  />
                  <Text size="sm" c="dimmed" inline mt={7}>
                    File selected.
                  </Text>
                </Flex>
              ) : files.length > 0 ? (
                <SimpleGrid w="100%" style={{ overflow: "hidden" }}>
                  {previews}
                </SimpleGrid>
              ) : imageUrl ? (
                <div style={{ position: "relative" }}>
                  <Image
                    src={imageUrl}
                    alt="Existing Image"
                    width="100%"
                    height={fileHeight}
                    style={{ objectFit: "cover", objectPosition: "center" }}
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
                    onClick={(e) => removeCard(undefined, e)}
                  />
                </div>
              ) : (
                <Box>
                  <Text size="sm" inline>
                    {placeholder ||
                      "Drag image here or click to select file for catalog's background."}
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    File shouldn&apos;t exceed 5mb.
                  </Text>
                </Box>
              )}
            </Box>
          </Group>
        </Flex>
      </Dropzone>
    </Container>
  )
}
