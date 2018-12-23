import React from 'react';
import styled from 'styled-components';

const Error = styled.p`
  padding: 0.5rem;
  margin: 0 0 1rem 0;
  color: white;
  background-color: tomato;
`;

export default ({ formErrors }) => (
  <React.Fragment>
    {Object.keys(formErrors).map(fieldName => {
      if (formErrors[fieldName].length > 0) {
        return (
          <Error key={fieldName}>
            {fieldName} {formErrors[fieldName]}
          </Error>
        );
      } else {
        return '';
      }
    })}
  </React.Fragment>
);
