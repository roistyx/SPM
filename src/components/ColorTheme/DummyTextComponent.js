import React from 'react';
import faker from 'faker';

function DummyTextComponent() {
  const headline = faker.lorem.sentence();
  const paragraph = faker.lorem.paragraph();
  const linkText = faker.lorem.words();

  return (
    <div>
      <h1>{headline}</h1>
      <p>{paragraph}</p>
      <a href="#">{linkText}</a>
    </div>
  );
}

export default DummyTextComponent;
