import { DefaultTheme } from './../../node_modules/styled-components/native/dist/dist/models/ThemeProvider.d';
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { /* No Nescessary implement*/ }
}