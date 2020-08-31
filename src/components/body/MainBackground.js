import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import LoadingAnimation from './LoadingAnimation';
import {useSelector} from 'react-redux';
import ErrorRequest from './ErrorRequest';

const MainBackground = (props) => {
  const {isLoading, errorRequest} = useSelector(
    ({GeneralReducer}) => GeneralReducer,
  );

  return (
    <ImageBackground source={props.source} style={styles.container}>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        errorRequest && (
          <ErrorRequest
            navigation={props.navigation}
            route={props.route || ''}
          />
        )
      )}
      {props.children}
    </ImageBackground>
  );
};
export default MainBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
});
