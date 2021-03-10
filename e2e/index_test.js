Feature('');

Scenario('check page loads', ({ I }) => {
  I.amOnPage('/');
  I.seeElement('#__next');
  I.see('Hello World!', 'h1');
});
