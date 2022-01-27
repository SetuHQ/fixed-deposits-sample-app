import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import { Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { numberValidator } from "../helpers/numberValidator";
import { emailValidator } from "../helpers/emailValidator";

import Slider from "react-native-slider";

export default function StartScreen({ navigation }) {
  const [number, setNumber] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [months, setMonths] = useState(6);
  const [amount, setAmount] = useState(50000);
  const [isLoading, setLoading] = useState(false);

  const getURL = async () => {
    setLoading(true);
    const numberError = numberValidator(number.value);
    const emailError = emailValidator(email.value);

    if (numberError) {
      setNumber({ ...number, error: numberError });
      setLoading(false);
    } else if (emailError) {
      setEmail({ ...email, error: emailError });
      setLoading(false);
    } else {
      try {
        // const response = await fetch("<URL_OF_EXPRESS_APP>/" + number.value);
        const json = {
          amount: amount,
          months: months * 30,
          email: email.value.trim(),
          number: number.value,
        };
        navigation.navigate("Dashboard", { param: json });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Invest First</Header>
      <Paragraph>Book an FD in less than 2 min.</Paragraph>
      <TextInput
        label="Email address"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
      />
      <TextInput
        label="Mobile number"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: "" })}
        error={!!number.error}
        errorText={number.error}
        keyboardType="number-pad"
      />
      <Paragraph
        style={{
          textAlign: "left",
          color: "#560CCE",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Amount : ₹ {amount}
      </Paragraph>
      <Slider
        value={amount}
        onValueChange={(value) => setAmount(value)}
        style={{ width: "100%" }}
        minimumValue={5000}
        maximumValue={90000}
        step={1000}
        minimumTrackTintColor="#E641ce"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#560CCE"
      />
      <Paragraph
        style={{
          textAlign: "left",
          color: "#560CCE",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Tenure : {months} months
      </Paragraph>
      <Slider
        value={months}
        onValueChange={(value) => setMonths(value)}
        style={{ width: "100%" }}
        minimumValue={3}
        maximumValue={12}
        step={1}
        minimumTrackTintColor="#E641ce"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#560CCE"
      />
      <Button mode="contained" onPress={getURL}>
        Confirm
      </Button>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </Background>
  );
}
