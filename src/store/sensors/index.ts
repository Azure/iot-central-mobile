import telemetryReducers, {
  sensors as telemetrySensors
} from "./telemetrySensors";
import propertyReducers, {
  sensors as propertySensors
} from "./propertySensors";

export default { ...telemetryReducers, ...propertyReducers };
const sensors: Array<any> = telemetrySensors.concat(propertySensors as Array<
  any
>);
export function subscribeAll() {
  return async dispatch => {
    return Promise.all(sensors.map(s => dispatch(s.subscribe())));
  };
}

export function unsubscribeAll() {
  return async dispatch => {
    return Promise.all(sensors.map(s => dispatch(s.unsubscribe())));
  };
}
