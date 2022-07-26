import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";

function alertConnectGlucometer() {
  Alert.alert(
    "New feature coming soon!",
    "Once bluetooth enabled glucometers start rolling out, this feature would work!"
  );
}

function alertNaN() {
  Alert.alert("Invalid Entry", "Make sure you entered a valid number!");
}
var sugarData = [0]

function BloodSugarTrendScreen({ navigation }) {
  //linechart stuff

  // new back button
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={39}
            color="rgb(0, 190, 199)"
            style={{ height: 30 }}
          />
          <Text
            style={{
              fontSize: 17,
              color: "rgb(0, 190, 199)",
              height: 30,
              marginTop: 9,
              marginLeft: -7,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  //Date
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var date = day + "/" + month + "/" + year;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "rgb(242, 242, 247)",
        padding: 8,
      }}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ height: 50 }} />
      <Text style={{ width: 300 }}>mmol/L</Text>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView horizontal={true} style={{ width: 350 }}>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"], //the dates
              datasets: [
                {
                  label: "Stuff",
                  data: sugarData, // the text input value
                },
              ],
            }}
            width={750}
            height={400}
            chartConfig={{
              decimalPlaces: 1,
              backgroundGradientFrom: "rgb(255, 255, 255)",
              backgroundGradientTo: "rgb(255, 255, 255)",
              color: (opacity = 100) => `rgba(0, 199, 190, ${opacity})`,
              labelColor: (opacity = 500) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: "2",
              propsForDots: {
                r: "2",
                strokeWidth: "2",
                stroke: "rgb(0, 199, 190)",
              },
              propsForHorizontalLabels: {
                fontFamily: "helvetica",
              },
            }}
            style={{
              borderRadius: 16,
              marginTop: 10,
              marginBottom: 10,
              marginleft: 300,
            }}
          />
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Add")}>
        <View
          style={{
            backgroundColor: "rgb(0, 199, 190)",
            width: 350,
            alignItems: "center",
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{ margin: 10, color: "rgb(255, 255, 255)", fontSize: 16 }}
          >
            Enter value manually
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ width: 350 }}>Alternatively,</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(0, 199, 190)",
          width: 350,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={alertConnectGlucometer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ color: "rgb(255, 255, 255)", margin: 10, fontSize: 16 }}
          >
            Connect to glucometer
          </Text>
          <View style={{ marginLeft: 5, marginTop: -5, marginRight: -5 }}>
            <FontAwesome5
              name="bluetooth-b"
              size={24}
              color="rgb(255, 255, 255)"
            />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

function addValue({ navigation }) {
  const [sugarValue, setSugarValue] = useState("")
    useEffect(() => {
      let newSugarData = [...sugarData, sugarValue]
      console.log(newSugarData)
    });
  //Date
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var date = day + "/" + month + "/" + year;

  //Time
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  if (min < 10) {
    var time = hours + ":0" + min;
  } else {
    var time = hours + ":" + min;
  }

  return (
    <View
      style={{
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "Helvetica",
          fontWeight: "bold",
          fontSize: 35,
          margin: 5,
          width: 300,
        }}
      >
        Add Reading
      </Text>

      <TextInput
        onChangeText={(text) => setSugarValue(text)}
        style={{
          padding: 5,
          margin: 10,
          width: 300,
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "rgb(229, 229, 234)",
        }}
        placeholder={"Reading on Glucometer"}
      />
      <Text style={{ margin: 5 }}>
        {date} at {time}, {sugarValue} mmol/L
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SugarStack")}
        >
          <Text
            style={{
              fontSize: 18,
              color: "rgb(rgb(0, 199, 190))",
              fontWeight: "bold",
              margin: 20,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
        <View style={{ width: 150 }} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 18,
              color: "rgb(rgb(0, 199, 190))",
              margin: 20,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function BloodSugarTrend() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="SugarStack"
        component={BloodSugarTrendScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add"
        component={addValue}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}