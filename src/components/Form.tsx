import React, { FC, FormEvent, ReactNode, useState } from 'react'
import c from 'classnames'
import { FormUI, Field as FieldProps } from '@terra-money/use-station'
import Field from './Field'
import s from './Form.module.scss'

interface Props {
  form: FormUI
  disabled?: boolean
  reversed?: boolean
  className?: string
  renderField?: (field: FieldProps) => ReactNode
  render?: (params: State) => ReactNode
}

export interface State {
  index: number
  setIndex: (index: number) => void
}

const Form: FC<Props> = ({ form, renderField, render, children, ...props }) => {
  const { reversed, className } = props
  const { title, fields, submitLabel, onSubmit } = form
  const disabled = props.disabled || form.disabled
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(-1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {reversed && children}

      <section className={className}>
        {fields.map((field, index) => (
          <Field
            field={field}
            focus={index === currentFieldIndex}
            onFocus={() => setCurrentFieldIndex(index)}
            render={renderField}
            key={field.attrs.id}
          />
        ))}
      </section>

      {!reversed && children}
      {render?.({ index: currentFieldIndex, setIndex: setCurrentFieldIndex })}

      <button
        type="submit"
        className={c('btn btn-block btn-primary', s.submit)}
        disabled={disabled}
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default Form