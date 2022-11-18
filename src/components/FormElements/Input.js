import { useContext } from 'react'
import { FormContext } from '../../utilities/formgeneratorContext'

const Input = ({ fieldId, fieldLabel, fieldPlaceholder, fieldValue }) => {
  const { handleChange } = useContext(FormContext)
  return (
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {fieldLabel}
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder={fieldPlaceholder ? fieldPlaceholder : ''}
        value={fieldValue}
        onChange={(event) => handleChange(fieldId, event)}
      />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
  )
}

export default Input
