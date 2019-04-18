import { Component } from "react";
import React from "react";
import { AppState } from "react-native";
import * as Colors from "../styling/colors";
import { StyleSheet, View, Geolocation } from "react-native";
import { NavigationProps } from "../props/NavigationProps";
import MagnetometerDashboard from "../../containers/sensors/magnetometerDashboardContainer";
import GyroscopeDashboard from "../../containers/sensors/gyroscopeDashboardContainer";
import AccelerometerDashboard from "../../containers/sensors/accelerometerDashboardContainer";
import PedometerDashboard from "../../containers/sensors/pedometerDashboardContainer";
import logger from "../../common/logger";

console.disableYellowBox = true;
export interface Props extends NavigationProps {
  subscribe;
  unsubscribe;
  subscribeSensors;
  unsubscribeSensors;
}
export interface State {}

export default class DeviceSensorDashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Telemetry"
  });

  async componentDidMount() {
    logger("component mount");
    await this.props.subscribe();
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  async componentWillUnmount() {
    logger("component unmount");
    await this.props.unsubscribe();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      this.props.unsubscribeSensors();
    } else if (nextAppState === "active") {
      this.props.subscribeSensors();
    }
  };
  render() {
    return (
      <View style={style.container}>
        <View style={{ flexDirection: "row" }}>
          <AccelerometerDashboard navigation={this.props.navigation} />
          <MagnetometerDashboard navigation={this.props.navigation} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <GyroscopeDashboard navigation={this.props.navigation} />
          <PedometerDashboard navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
