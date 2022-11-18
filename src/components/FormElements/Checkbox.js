import { useContext } from 'react'
import { FormContext } from '../../utilities/formgeneratorContext'

const Checkbox = ({ fieldId, fieldLabel, fieldValue }) => {
  const { handleChange } = useContext(FormContext)
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
        checked={fieldValue}
        onChange={(event) => handleChange(fieldId, event)}
      />
      <label className="form-check-label" htmlFor="exampleCheck1">
        {fieldLabel}
      </label>
    </div>
  )
}

export default Checkbox
