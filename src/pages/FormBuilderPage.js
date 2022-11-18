import React, { useState } from 'react'
import { TbGridDots } from 'react-icons/tb'
import { AiFillDelete, AiOutlineBars } from 'react-icons/ai'
import { GrAdd } from 'react-icons/gr'
import '../assets/scss/FormBuilder/FormBuilder.scss'

const FormBuilderPage = () => {
  const [formValues, setFormValues] = useState([
    {
      heading: '',
      subheading: '',
      fields: [
        { fieldname: '', fieldtype: '', unit: '', defaultvalue: '', value: '' },
      ],
    },
  ])
  const handleChange = (i, e) => {
    const newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }
  const handleChangeFields = (i, index, e) => {
    const newFormValues = [...formValues]
    const data = newFormValues[i].fields
    data[index][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  const addFormHeading = () => {
    setFormValues([
      ...formValues,
      {
        heading: '',
        subheading: '',
        fields: [
          {
            fieldname: '',
            fieldtype: '',
            unit: '',
            defaultvalue: '',
            value: '',
          },
        ],
      },
    ])
  }

  const removeFormHeading = (i) => {
    const newFormValues = [...formValues]
    if (newFormValues.length === 1) return
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
  }

  const addFormFields = (i) => {
    const data = formValues.map((item, index) => {
      if (index === i) {
        item.fields.push({
          fieldname: '',
          fieldtype: '',
          unit: '',
          defaultvalue: '',
          value: '',
        })
      }
      return item
    })
    setFormValues(data)
  }

  const removeFormFields = (i, index, e) => {
    const newFormValues = [...formValues]
    const data = newFormValues[i].fields
    if (data.length === 1) return
    data[index][e.target.name] = e.target.value
    data.splice(index, 1)
    setFormValues(newFormValues)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    alert(JSON.stringify(formValues))
  }

  return (
    <form className="form-builder" onSubmit={handleSubmit}>
      <div className="form-mainDiv">
        {formValues.map((element, index) => (
          <div key={index} className="form-inner">
            <div className="div1">
              <div className="div2">
                <TbGridDots size="30" />
              </div>
              <div className="div3">
                <label htmlFor="heading" className="head-labels">
                  Heading
                </label>
                <input
                  name="heading"
                  type="text"
                  id="heading"
                  value={element.heading || ''}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="div3">
                <label className="head-labels" htmlFor="subHeading">
                  Sub Heading
                </label>
                <input
                  name="subheading"
                  type="text"
                  id="subHeading"
                  value={element.subheading || ''}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="div5">
                {formValues.length !== 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFormHeading(index)}
                  >
                    <AiFillDelete />
                  </button>
                )}
              </div>
            </div>
            <div className="field-Main">
              <div className="form-icons">
                <AiOutlineBars size={30} />
              </div>
              <div className="field">
                <div className="field-names">
                  <h4>Field Name</h4>
                  <h4>Field Type</h4>
                  <h4>Unit</h4>
                  <h4>Default Value</h4>
                  <h4>Value</h4>
                </div>
                {element.fields.map((item, innerIndex) => (
                  <div key={innerIndex} className="field-names">
                    <input
                      value={item.fieldname || ''}
                      name="fieldname"
                      onChange={(e) => handleChangeFields(index, innerIndex, e)}
                      type="text"
                    />
                    <input
                      value={item.fieldtype || ''}
                      name="fieldtype"
                      onChange={(e) => handleChangeFields(index, innerIndex, e)}
                      type="text"
                    />
                    <input
                      value={item.unit || ''}
                      name="unit"
                      onChange={(e) => handleChangeFields(index, innerIndex, e)}
                      type="text"
                    />
                    <input
                      value={item.defaultvalue || ''}
                      name="defaultvalue"
                      onChange={(e) => handleChangeFields(index, innerIndex, e)}
                      type="text"
                    />
                    <input
                      value={item.value || ''}
                      name="value"
                      onChange={(e) => handleChangeFields(index, innerIndex, e)}
                      type="text"
                    />
                    {element.fields.length !== 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => removeFormFields(index, innerIndex, e)}
                      >
                        <AiFillDelete />
                      </button>
                    )}
                  </div>
                ))}
                <div className="add-field">
                  <button
                    type="button"
                    onClick={() => addFormFields(index)}
                    className="btn btn-info"
                  >
                    <GrAdd />
                    <span>Add Field</span>
                  </button>
                </div>
              </div>
            </div>
          
          </div>
        ))}
          <div className="add-btn">
              <button
                type="button"
                className="btn btn-info"
                onClick={addFormHeading}
              >
                <GrAdd />
                <span>Add Heading</span>
              </button>
            </div>
      </div>
      <button type="submit" className="btn sub-btn btn-success">
        Submit
      </button>
    </form>
  )
}

export default FormBuilderPage
