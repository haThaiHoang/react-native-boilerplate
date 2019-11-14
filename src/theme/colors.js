import tinycolor from 'tinycolor2'

export const darken = (color: string, value: number) => tinycolor(color).darken(value).toString()
export const lighten = (color: string, value: number) => tinycolor(color).lighten(value).toString()
export const isLight = (color: string) => tinycolor(color).isLight()
export const setAlpha = (color: string, value: number) => tinycolor(color).setAlpha(value).toString()

export const GRAY_200 = '#EEEEEE'
export const GRAY_500 = '#9E9E9E'
export const GRAY_700 = '#616161'

export const GREEN_200 = '#A5D6A7'
export const GREEN_500 = '#4CAF50'
export const GREEN_700 = '#388E3C'
export const GREEN_900 = '#388E3C'

export const ORANGE_200 = '#FFAB91'
export const ORANGE_500 = '#FF5722'
export const ORANGE_700 = '#E64A19'
export const ORANGE_900 = '#BF360C'

export const RED_200 = '#EF9A9A'
export const RED_500 = '#F44336'
export const RED_700 = '#D32F2F'

export const PINK_200 = '#F48FB1'
export const PINK_500 = '#E91E63'
export const PINK_700 = '#C2185B'
export const PINK_900 = '#880E4F'

export const PRIMARY = GREEN_700
