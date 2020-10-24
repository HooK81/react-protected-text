import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';

/**
 * ProtectedText Component
 * @param {ProtectedText.propTypes} props
 */
export function ProtectedText(props) {
  const [domText, setDomText] = useState('');
  const [beforeText, setBeforeText] = useState('');
  const [afterText, setAfterText] = useState('');

  /**
   * Reverse and split the text
   * @returns array
   */
  const reverseAndSplit = useCallback(() => {
    const reverse = reverseWrappers(props.text.split('').reverse().join(''));
    let parts;
    if (props.onlyHTML) {
      parts = [reverse];
    } else {
      parts = split(reverse);
    }

    return parts;
  }, [props.text, props.onlyHTML]);

  /**
   * Split text in 3 parts
   * @param {string} str Text
   * @returns array
   */
  function split(str) {
    if (!str) return [];
    const size = Math.max(1, Math.ceil(str.length / 3));
    str = String(str);

    return str.match(new RegExp(`.{1,${size}}`, 'g'));
  }

  /**
   * Reverse common wrappers
   * @param {Re} str
   */
  function reverseWrappers(str) {
    return str
      .replace('(', ')')
      .replace(')', '(')
      .replace('{', '}')
      .replace('}', '{')
      .replace('[', ']')
      .replace(']', '[');
  }

  /**
   * Set the text parts into state
   */
  useEffect(() => {
    const parts = reverseAndSplit();

    if (props.onlyHTML) {
      setBeforeText('');
      setDomText(parts[0] ? parts[0] : '');
      setAfterText('');
    } else {
      setBeforeText(parts[0] ? parts[0] : '');
      setDomText(parts[1] ? parts[1] : '');
      setAfterText(parts[2] ? parts[2] : '');
    }
  }, [props.text, props.onlyHTML, reverseAndSplit]);

  /**
   * Render Text
   */
  function renderText() {
    const { text, href, className, protectedHref, hrefHeaders, onlyHTML, ...others } = props;

    return <span {...others}>{domText}</span>;
  }

  /**
   * Render Link
   */
  function renderLink() {
    const { text, href, className, protectedHref, hrefHeaders, onlyHTML, ...others } = props;

    return (
      <a href={props.protectedHref} onClick={onLinkClick} {...others}>
        {domText}
      </a>
    );
  }

  /**
   * Handle click on Link
   * @param {Event} event
   */
  function onLinkClick(event) {
    event.preventDefault();
    let headers = '';
    if (props.hrefHeaders) {
      headers =
        '?' +
        Object.keys(props.hrefHeaders)
          .map((key) => `${key}=${encodeURIComponent(props.hrefHeaders[key])}`)
          .join('&');
    }

    if (event.metaKey || event.ctrlKey) {
      window.open(props.href + headers, '_blank');
    } else {
      window.location.assign(props.href + headers);
    }
  }

  // Render Component
  return (
    <Style>
      {`
        * {
          unicode-bidi: bidi-override;
          direction: rtl;
        }` +
        (!props.onlyHTML
          ? `
        *:before {
          content: "${beforeText}"
        }
        *:after {
          content: "${afterText}"
        }`
          : '')}
      <span className={`protected-text ${props.className}`}>
        {!props.href && renderText()}
        {props.href && renderLink()}
      </span>
    </Style>
  );
}
export default ProtectedText;

ProtectedText.defaultProps = {
  text: '',
  href: '',
  onlyHTML: false,
  className: '',
  protectedHref: 'https://click',
};

ProtectedText.propTypes = {
  /**
   * Text to render
   */
  text: PropTypes.string.isRequired,

  /**
   * URL for link
   */
  href: PropTypes.string,

  /**
   * Force text to render only in HTML and prevent use of CSS pseudo-class
   */
  onlyHTML: PropTypes.bool,

  /**
   * Additionnal parameters for link
   */
  hrefHeaders: PropTypes.object,

  /**
   * Custom class name
   */
  className: PropTypes.string,

  /**
   * Custom obfuscated url
   */
  protectedHref: PropTypes.string,
};
