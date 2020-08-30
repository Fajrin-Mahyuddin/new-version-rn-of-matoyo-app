import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const ButtonFilterHeader = (props) => {
  return (
    <View style={styles.filterWrapper}>
      <TouchableOpacity
        style={{...styles.filterLink, ...styles.filterLinkActive}}>
        <Text style={styles.filterLinkText}>Semua</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterLink}>
        <Text style={styles.filterLinkText}>Makanan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterLink}>
        <Text style={styles.filterLinkText}>Minuman</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonFilterHeader;

const styles = StyleSheet.create({
  filterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  filterLink: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  filterLinkActive: {
    backgroundColor: '#F9A826',
  },
  filterLinkText: {
    fontSize: 16,
    color: '#3F3D56',
  },
});
