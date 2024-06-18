import { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import FromHeader from "./FromHeader";
import FormSelectorBtn from "./FormSelectorBtn";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm.js";

const { width } = Dimensions.get("window");

export default function AppForm() {
  const animation = useRef(new Animated.Value(0)).current;

  const scrollView = useRef();

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });

  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27, 27, 51, 1)", "rgba(27, 27, 51, 0.4)"],
  });

  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27, 27, 51, 0.4)", "rgba(27, 27, 51, 1)"],
  });

  const handleNavigationChange = () =>
    scrollView.current?.scrollTo({ x: 0, animated: true });

  return (
    <View style={styles.container}>
      <View style={{ height: 80 }}>
        <FromHeader
          leftHeading="Welcome"
          rightHeading="Back"
          subHeading="Your Personal Wealth Manager App"
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <FormSelectorBtn
          style={styles.borderLeft}
          backgroundColor={loginColorInterpolate}
          title="Login"
          onPress={handleNavigationChange}
        />
        <FormSelectorBtn
          style={styles.borderRight}
          backgroundColor={signupColorInterpolate}
          title="Sign up"
          onPress={() =>
            scrollView.current?.scrollTo({ x: width, animated: true })
          }
        />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        <LoginForm />
        <ScrollView>
          <SignupForm handleNavigationChange={handleNavigationChange} />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
