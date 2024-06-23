import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import TextareaAutosize from "react-textarea-autosize"

export interface LabeledTextAreaProps extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. */
  type?: "text"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  width?: string
  minRows?: number
  maxRows?: number
}

export const LabeledTextArea = forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  (
    { label, outerProps, labelProps, name, width = "100%", minRows = 1, maxRows = 5, ...props },
    ref
  ) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <TextareaAutosize
            minRows={minRows}
            maxRows={maxRows}
            // ref={ref}
            disabled={isSubmitting}
            {...register(name)}
            {...props}
            style={{ width, border: "none" }}
          />
        </label>

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />

        <style jsx>{`
          div {
            width: 100%;
          }
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
            border: none;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextArea
