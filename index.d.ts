// TypeScript Version: 3.4

import { ReactElement } from 'react'

declare namespace ProtectedText {
  interface ProtectedTextProps {
    /** Text to render */
    text: string
    /** URL for link */
    href?: string
    /** Force text to render only in HTML and prevent use of CSS pseudo-class */
    onlyHTML?: boolean
    /** Custom class name */
    className?: string
    /** Additionnal parameters for link */
    hrefHeaders?: object
    /** Custom obfuscated url */
    protectedHref?: string
  }
}
declare function ProtectedText(props: ProtectedText.ProtectedTextProps): ReactElement;

export default ProtectedText;
