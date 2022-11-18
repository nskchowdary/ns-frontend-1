import { useEffect, useState } from 'react'
import '../assets/scss/FormGeneratorPage/FormGeneratorPage.scss'
import Element from '../components/FormElements/Element'
import formJSON from '../formElement.json'
import { FormContext } from '../utilities/formgeneratorContext'

function FormGeneratorPage() {
  const [elements, setElements] = useState(null)
  useEffect(() => {
    setElements(formJSON[0])
  }, [])
  const { fields, pageLabel } = elements ?? {}
  const handleSubmit = (event) => {
    event.preventDefault()
    alert(JSON.stringify(elements))
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach((field) => {
      const { fieldType, fieldId } = field
      if (id === fieldId) {
        switch (fieldType) {
          case 'checkbox':
            field['fieldValue'] = event.target.checked
            break

          default:
            field['fieldValue'] = event.target.value
            break
        }
      }
      setElements(newElements)
    })
  }
  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="form-Main container">
        <h3>{pageLabel}</h3>
        <form className="">
          {fields
            ? fields.map((field, i) => <Element key={i} field={field} />)
            : null}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </FormContext.Provider>
  )
}

export default FormGeneratorPage
