// import React from 'react';

// // const Form = () => {
// //   const [recipes, setRecipes] = useState([]);
// //   const [error, setError] = useState(null);
// const FormInput = ({
//   fieldName, label, helpMessage, error, value, onChange,
// }) => (
//   <FormControl error={error}>
//     <FormLabel htmlFor={fieldName} labelPlacement="top">{label}</FormLabel>
//     <OutlinedInput id={fieldName}
// aria-describedby="help-{fieldName}" value={value} onChange={onChange} type="text" />
//     <FormHelperText id="help-{fieldName}">
//       {helpMessage}
//     </FormHelperText>
//   </FormControl>
// );

// export default FormInput;

// {ingredientInputFields.map((ingredientInputField, index) => (
//   // eslint-disable-next-line react/no-array-index-key
//   <div key={index}>
//     <Field
//       label="Amount"
//       as={TextField}
//       variant="outlined"
//       size="small"
//       name="amount"
//       // value={ingredientInputField.amount}
//       error={Boolean(errors.ingredients[{ index }].amount)
//         && Boolean(touched.amount)}
//       helperText={Boolean(touched.amount)
//         && errors.amount}
//     />
// <Field
//   label="Ingredient"
//   as={TextField}
//   variant="outlined"
//   size="small"
//   name="item"
//   // value={ingredientInputField.item}
//   error={Boolean(errors.item) && Boolean(touched.item)}
//   helperText={Boolean(touched.item) && errors.item}
// />
// {index ? (
//   <RemoveIcon
// disabled={ingredientInputField.length === 1}
// onClick={() => handleRemoveFields(ingredientInputField.item)}
//   />
// ) : null}
// <AddIcon
//   onClick={handleAddFields}
// />
//   </div>
// ))}
