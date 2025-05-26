import CONSTANTS from '../constants'

export type Reactions = {
  [reaction in string & (typeof CONSTANTS)['REACTIONS'][number]]: number
}
