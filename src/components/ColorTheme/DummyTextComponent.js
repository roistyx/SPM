import React from 'react';
import { faker } from '@faker-js/faker';

function DummyTextComponent() {
  const headline = faker.lorem.sentence(2);
  const paragraph = faker.lorem.paragraph(20);
  const linkText = faker.lorem.words(2);

  return (
    <div>
      <h1>{headline}</h1>
      <p>
        {paragraph} <a href="#">{linkText}</a>
      </p>
    </div>
  );
}

export default DummyTextComponent;
