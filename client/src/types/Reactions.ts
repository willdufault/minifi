import CONSTANTS from "../constants"

export type Reactions = {
  [reaction in typeof CONSTANTS.REACTIONS]: number
}
