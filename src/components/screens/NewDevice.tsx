import { Component } from "react";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  Switch
} from "react-native";
import * as Colors from "../styling/colors";
import { NavigationProps } from "../props/NavigationProps";
import DeviceInfo from "react-native-device-info";
import Loader from "../loading/Loader";

export interface Props extends NavigationProps {
  provisionDevice: (appId, deviceName) => any;
  connectDeviceFirst: (appId, deviceName) => any;
  isLoading: boolean;
}

export interface State {
  application;
  name: string;
  deviceFirst: boolean;
}

export default class NewDevice extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const application = props.navigation.getParam("app");

    this.state = {
      application,
      name: DeviceInfo.getDeviceName(),
      deviceFirst: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "New Device"
    };
  };

  async componentDidMount() {}

  // TODO migrate to fully managed react navigation
  handleTapped = async device => {};

  render() {
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <Loader loading={this.props.isLoading} />
        <View style={style.textContainer}>
          <Text style={style.text}>Name:</Text>
          <TextInput
            style={style.textInput}
            returnKeyType="done"
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
            placeholder="Enter Device Name."
          />
        </View>
        <TouchableHighlight
          style={{
            ...style.button
          }}
          onPress={async () => {
            this.state.deviceFirst
              ? await this.props.connectDeviceFirst(
                  this.state.application.id,
                  this.state.name
                )
              : await this.props.provisionDevice(
                  this.state.application.id,
                  this.state.name
                );

            this.props.navigation.navigate("DeviceList");
          }}
        >
          <Text style={{ color: Colors.BUTTON_TEXT, fontSize: 20 }}>
            Create
          </Text>
        </TouchableHighlight>

        <View style={style.switchRow}>
          <Text style={style.switchLabel}>Device First</Text>
          <Switch
            value={this.state.deviceFirst}
            onValueChange={value => this.setState({ deviceFirst: value })}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  textInput: {
    fontSize: 20,
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    padding: 10
  },
  textContainer: {
    backgroundColor: Colors.TILE_BACKGROUND_COLOR,
    flexDirection: "row",
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  button: {
    backgroundColor: Colors.BUTTON,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginBottom: 15,
    marginTop: 6,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    elevation: 5
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10
  },
  switchLabel: {
    color: Colors.TILE_TITLE_COLOR,
    fontSize: 18,
    fontWeight: "500",
    marginRight: 10
  }
});
