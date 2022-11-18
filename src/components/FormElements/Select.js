import { useContext } from 'react'
import { FormContext } from '../../utilities/formgeneratorContext'

const Select = ({
  fieldId,
  fieldLabel,
  fieldOptions,
}) => {
  const { handleChange } = useContext(FormContext)

  return (
    <>
      <label className="form-label">{fieldLabel}</label>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(event) => handleChange(fieldId, event)}
      >
        <option>Open this select menu</option>
        {fieldOptions.length > 0 &&
          fieldOptions.map((option, i) => (
            <option value={option.optionLabel} key={i}>
              {option.optionLabel}
            </option>
          ))}
      </select>
    </>
  )
}

export default Select
