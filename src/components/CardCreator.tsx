import { Button, Group, Center, Box, Flex, Textarea } from "@mantine/core"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { IconCirclePlus, IconGripVertical, IconX, IconCheck } from "@tabler/icons-react"
import styles from "src/styles/Catalogs.module.css"

import DragAndDrop from "@components/DragAndDrop"
import useFormValidity from "@/hooks/useFormValidity"

interface Creator {
  form: any
  oneStep?: boolean
}

export const CardCreator = ({ form, oneStep }: Creator) => {
  const isFormValid = useFormValidity(form)
  const fields = form?.values.cards.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt="xs"
          {...provided.draggableProps}
          className={styles.mantineDropzoneInner}
          component="fieldset"
        >
          <Flex justify={"space-between"} className={styles.fullWidth}>
            <Center {...provided.dragHandleProps}>
              <IconGripVertical size="1rem" />
              Press and slide to change the order
            </Center>
            <IconX onClick={() => removeCard({ index })} />
          </Flex>
          <legend>Card #{index + 1} </legend>
          <Flex direction={"column"} className={styles.fullWidth}>
            <Flex wrap={"wrap"} gap={"8px"} justify={"space-between"} className={styles.fullWidth}>
              <Textarea
                size="sm"
                radius="md"
                label="Term"
                placeholder="Term"
                withAsterisk
                {...form.getInputProps(`cards.${index}.term`)}
                className={styles.textarea}
                error={form.errors.cards?.[index]?.term}
              />
              <Textarea
                size="sm"
                radius="md"
                label="Description"
                placeholder="Description text"
                {...form.getInputProps(`cards.${index}.termDesc`)}
                className={styles.textarea}
                error={form.errors.cards?.[index]?.termDesc}
              />
            </Flex>
          </Flex>
          <DragAndDrop />
          <Flex wrap={"wrap"} gap={"8px"} className={styles.fullWidth}>
            <Textarea
              size="sm"
              radius="md"
              label="Definition"
              withAsterisk
              placeholder="Definition"
              {...form.getInputProps(`cards.${index}.definition`)}
              className={styles.textarea}
              error={form.errors.cards?.[index]?.definition}
            />
            <Textarea
              size="sm"
              radius="md"
              label="Description"
              placeholder="Description"
              {...form.getInputProps(`cards.${index}.defDesc`)}
              className={styles.textarea}
              error={form.errors.cards?.[index]?.defDesc}
            />
          </Flex>
        </Group>
      )}
    </Draggable>
  ))

  const removeCard = (index) => {
    console.log({ index })
    form.removeListItem("cards", index.index)
  }

  return (
    <Box>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          destination?.index !== undefined &&
          form.reorderListItem("cards", { from: source.index, to: destination.index })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Group justify="center" mt="md">
        <Button
          variant="filled"
          color="var(--mantine-color-blue-6)"
          radius="md"
          disabled={!isFormValid}
          onClick={() =>
            form.insertListItem("cards", {
              term: "",
              termDesc: "",
              definition: "",
              defDesc: "",
            })
          }
        >
          <IconCirclePlus /> Add card
        </Button>
        {oneStep && (
          <Button
            variant="filled"
            color="var(--mantine-color-lime-6)"
            radius="md"
            onClick={() => {}}
            disabled={!isFormValid}
          >
            <IconCheck /> Save
          </Button>
        )}
      </Group>
    </Box>
  )
}
