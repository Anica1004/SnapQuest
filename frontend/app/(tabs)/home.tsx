import React, { useEffect, useState }  from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, Animated, Easing } from 'react-native';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';

const Homescreen = () => {
  // Replace 'USERNAME' with your state variable or prop
  const username = 'Chehak';
  const questImage = require('../../assets/cherryblossom.png');
    // Set due date and time
  const dueDateTime = moment.tz("2024-04-07T23:59:00", "America/Los_Angeles");

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = moment();
    const duration = moment.duration(dueDateTime.diff(now));
    return duration.asHours(); // Returns the difference in hours
  };

  // State to hold the time remaining
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Animated value for rotation
  const [spin] = useState(new Animated.Value(0));

   // Function to start rotation animation
   const startAnimation = () => {
    Animated.loop(
      Animated.timing(
        spin,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        } 
      )
    ).start();
  };
  // Update time remaining every minute
  useEffect(() => {
    startAnimation(); // Start the rotation animation
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000); // Update every minute

      return () => clearInterval(interval);
    }, []);
  
    // Interpolate animated value for rotation
    const spinAnimation = spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {username}!</Text>
      </View>

      {/* Quest Card Section */}
      <View style={styles.questCard}>
        <Image source={questImage} style={styles.questImage} />
        <Text style={styles.questTitle}>TODAY'S QUEST:</Text>
        <Text style={styles.questName}>Let's venture out of the house and take a stroll in nature, exploring the Cherry Blossom Festival at David Lam's Park</Text>
        <Text style={styles.questStatus}>Not completed yet!</Text>
        <Text style={styles.dueDateTime}>Upload your photo by {dueDateTime.format('MMMM Do, YYYY [at] h:mm A z')} to maintain your streak</Text>
        <View style={styles.timeRemainingContainer}>
          <Animated.View style={[styles.hourglassIcon, { transform: [{ rotate: spinAnimation}] }]}>
            <Icon name="hourglass" size={20} color="#666666" />
          </Animated.View>
          <Text style={styles.timeRemaining}>Time Remaining: {timeRemaining}</Text>
        </View>
      </View>
      
      {/* Additional components will go here */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB', //pink color
  },
  header: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FFFFFF', // white colour 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1', // Light gray border color

  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // dark gray color for text
  },
  questCard: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F7FFF7', // Card background color
    shadowColor: '#000000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    alignItems: 'center',
  },

  questImage: {
    width: 300, // Set the width of the image
    height: 200, // Set the height of the image
    borderRadius: 0, // Optional: if you want the image to be round
    marginBottom: 16, // Add some space between the image and the title text
  },
  
  questTitle: {
    fontSize: 16,
    color: '#333333', // dark gray colour
    marginBottom: 8,
  },
  questName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A535C', // Darker shade of green for the quest name
  },
  questStatus: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B', // Adjust as needed, this is usually a highlight color
  },
  dueDateTime: {
    marginTop: 8,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666666',
  },
  timeRemainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeRemaining: {
    marginLeft: 8,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666666',
  },
  hourglassIcon: {
    marginRight: 5,
  },
  // Styles for additional components will go here
});

export default Homescreen;
