import Enum from 'enum';
import * as _ from 'lodash';

// or extend node.js with this new type
Enum.register();

Enum.prototype.getChoices = function getChoices() {
  return _.map(this.enums, 'key');
};

export const WATER_VALVE_STATES = new Enum(['open', 'closed']);
