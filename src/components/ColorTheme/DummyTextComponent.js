import React from 'react';
import { faker } from '@faker-js/faker';
import _ from 'lodash';

function DummyTextComponent() {
  const headline = faker.lorem.sentence(2);
  const paragraph = faker.lorem.paragraph(20);
  const linkText = faker.lorem.words(2);
  const slug = faker.lorem.slug(50);

  return (
    <div>
      <h1>{_.startCase(headline.replace('.', ''))}</h1>
      <p>
        {paragraph} <a href="#">{linkText}</a>
      </p>
      {slug}
    </div>
  );
}

export default DummyTextComponent;
