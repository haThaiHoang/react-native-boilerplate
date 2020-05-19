import tinycolor from 'tinycolor2'

export const darken = (color: string, value: number) => tinycolor(color).darken(value).toString()
export const lighten = (color: string, value: number) => tinycolor(color).lighten(value).toString()
export const isLight = (color: string) => tinycolor(color).isLight()
export const setAlpha = (color: string, value: number) => tinycolor(color).setAlpha(value).toString()

export const PRIMARY = '#388E3C'
export const DARK = '#595757'
