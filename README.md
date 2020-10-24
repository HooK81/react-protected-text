# react-protected-text

React component for text & link protection from web crawlers / bots

![Build][build-badge]
![Coverage][coverage-badge]
[![Size][size-badge]][size]

## Install

[![NPM info][npm-badge]][npm]

```sh
npm install react-protected-text
```

## Why?

Do you want to display text (name, phone, address) or link (email) but prevent web crawlers from stealing them from your website ?
If you just simply publish an email address on a website you can expect tons of spam.
This is why you have to make sure you never add your email or phone to any website as plain text which is visible by bots.

## How it works

The component uses a mixture of pure text in HTML and CSS.
The text is partially rendered in reverse in HTML and the rest is prepend/append by CSS. CSS will then reverse all text again.
Link URL is obfuscated until an onClick event occur.
This making the text or link useless for spammers, but user friendly on a browser.

Under the hood, it uses the duo of CSS properties _unicode-bidi: bidi-override;_ and _direction: rtl;_

## Use

#### Basic hello world:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ProtectedText from 'react-protected-text';

ReactDOM.render(<ProtectedText text="Hello World!" />, document.body);
```

<details>
<summary>Show rendered HTML</summary>

```jsx
<span class="protected-text">
  <style type="text/css">
    * {
      unicode-bidi: bidi-override; direction: rtl;
    }
    .protected-text > *:before {
      content: "!dlr" 
    }
    .protected-text > *:after {
      content: "lleH"
    }
  </style>
  <span>oW o</span>
</span>
```

</details>       
<details>
<summary>Show human interaction</summary>

```jsx
<span>Hello World!</span>
```

</details>

#### Basic link:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ProtectedText from 'react-protected-text';

ReactDOM.render(
  <ProtectedText
    text="hello@world.com"
    href="mailto:hello@world.com"
    hrefHeaders={{ subject: 'Contact', cc: 'john@doe.com' }}
  />,
  document.body,
);
```

<details>
<summary>Show rendered HTML</summary>

```jsx
<span class="protected-text">
  <style type="text/css">
    * {
      unicode-bidi: bidi-override; direction: rtl;
    }
    *:before {
      content: "moc.d"
    }
    *:after {
      content: "olleh"
    }
  </style>
  <a href="https://click">lrow@</a>
</span>
```

</details>
<details>
<summary>Show human interaction</summary>

```jsx
<a href="mailto:hello@world.com?subject=Contact@cc=john@doe.com">hello@world.com</a>
```

</details>

## What about copying to clipboard ?
Using CSS _unicode-bidi: bidi-override;_ and _direction: rtl;_ will cause one drawback: The user can no longer copy text to clipboard.
This is a small price to pay in my view. 

## Props

| Prop          | Type     | Default         | Description |
| --------------| -------- | --------------- | - |
| text          | _string_ | ''              | The text to display |
| href          | _string_ | ''              | Target URL for link.<br>Support of mailto:, tel:, sms:, :facetime, ect. |
| onlyHTML      | _bool_   | false           | Prevent use of CSS pseudo-class. Obfuscation is done only in HTML.<br>This will reduce level of protection. |
| hrefHeaders   | _object_ | null            | Parameters added to URL:<br>subject, cc, bcc, body, ect. |
| className     | _string_ | ''              | Custom class name |
| protectedHref | _string_ | 'https://click' | URL to show when obfuscated |

## Browsers Compatibility

Component was tested on following browsers:

- Chrome (Desktop + Mobile)
- Firefox
- Safari (Desktop + Mobile)
- Edge
- Internet Explorer 11

## Disclaimer
This solution will work while crawler does not detect it. Technicaly is it still possible to retrieve whole text but the component makes it harder.

## License

[MIT][license] © [Julien CROCHET][author]

[build-badge]: https://img.shields.io/static/v1?label=build&message=passing&color=brightgreen
[size-badge]: https://img.shields.io/bundlephobia/minzip/react-protected-text
[coverage-badge]: https://img.shields.io/static/v1?label=coverage&message=100%&color=brightgreen
[size]: https://bundlephobia.com/result?p=react-protected-text
[npm-badge]: https://nodei.co/npm/react-protected-text.png?downloads=true
[npm]: https://www.npmjs.com/package/react-protected-text
[license]: LICENSE
[author]: https://www.crochet.me
