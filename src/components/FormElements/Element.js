import Checkbox from './Checkbox'
import Input from './Input'
import Select from './Select'

const Element = ({
  field: {
    fieldType,
    fieldId,
    fieldLabel,
    fieldPlaceholder,
    fieldValue,
    fieldOptions,
  },
}) => {
  switch (fieldType) {
    case 'text':
      return (
        <Input
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          fieldPlaceholder={fieldPlaceholder}
          fieldValue={fieldValue}
        />
      )
    case 'select':
      return (
        <Select
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          fieldPlaceholder={fieldPlaceholder}
          fieldValue={fieldValue}
          fieldOptions={fieldOptions}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          fieldValue={fieldValue}
        />
      )

    default:
      return null
  }
}

export default Element
