import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import Header from "../components/Header";
import Button from "../components/Button";
import { ActivityIndicator } from "react-native";
import Logo from "../components/Logo";

export default function Complete({ navigation }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      fetchData();
    }, 5000);
  }, []);

  const fetchData = async () => {
    setLoading(false);
  };

  return (
    <Background>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : (
        <>
          <Logo />
          <Header>Invest First</Header>
          <Paragraph>FD successfully booked</Paragraph>
          <Button
            mode="outlined"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "StartScreen" }],
              })
            }
          >
            Go home
          </Button>
        </>
      )}
    </Background>
  );
}
