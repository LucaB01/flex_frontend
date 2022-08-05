import { TextStyle } from "react-native"
import { colors } from "../../../colors"

const BASE: TextStyle = {
    color: colors.text,
    fontSize: 16,
  }
  
  /**
   * All the variations of text styling within the app.
   *
   * You want to customize these to whatever you need in your app.
   */
  export const presets = {
    /**
     * The default text styles.
     */
    default: BASE,
  
    /**
     * A bold version of the default text.
     */
    bold: { ...BASE, fontWeight: "bold" } as TextStyle,
  
    /**
     * Large headers.
     */
    header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,
  
    /**
     * A smaller piece of secondary information.
     */
    secondary: { ...BASE, fontSize: 10, opacity: 0.6 } as TextStyle,
  }
  
  /**
   * A list of preset names.
   */
  export type TextPresets = keyof typeof presets