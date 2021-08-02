import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import FeatherIcons from 'react-native-vector-icons/Feather'

export function LikeIcon(props) {
  return (
    <AntDesignIcons
      style={styles.icon}
      name="like2"
      size={16}
      color="#444"
    />
  )
}

export function RemoveIcon(props) {
  return (
    <TouchableOpacity onPress={() => props.onDelete(props.id)} >
      <MaterialIcons
        style={styles.icon}
        name="highlight-remove"
        size={16}
        color="#318DFE"
      />
    </TouchableOpacity>
  )
}

export function HeartIcon(props) {
  return (
    <FontAwesomeIcons
      style={styles.icon}
      name="heart-o"
      size={16}
      color="#000"
    />
  )
}

export function TasksIcon({ size, color }) {
  return (
    <FontAwesome5Icons
      // style={styles.icon}
      name="tasks"
      size={size}
      color={color}
    />
  )
}

export function HeartPlusIcon({ size, color }) {
  return (
    <MaterialCommunityIcons
      // style={styles.icon}
      name="heart-plus"
      size={size}
      color={color}
    />
  )
}

export function UserIcon({ size, color }) {
  return (
    <FontAwesomeIcons
      // style={styles.icon}
      name="user"
      size={size}
      color={color}
    />
  )
}

export function TrashIcon(props) {
  return (
    <FeatherIcons
      style={styles.icon}
      name="trash"
      size={16}
      color="#FF6666"
    />
  )
}

export function RefreshIcon() {
  return (
    <MaterialIcons
      style={styles.icon}
      name="refresh"
      size={22}
      color="#FF6666"
    />
  )
}

export function CheckCircleOutlineIcon({ size, color }) {
  return (
    <AntDesignIcons
      // style={styles.icon}
      name="check"
      size={size}
      color={color}
    />
  )
}

export function StickerRemoveOutlineIcon({ size, color }) {
  return (
    <MaterialCommunityIcons
      // style={styles.icon}
      name="playlist-remove"
      size={size}
      color={color}
    />
  )
}

export function AddPhotoIcon() {
  return (
    <MaterialIcons
      style={styles.icon}
      name="add-a-photo"
      size={22}
      color="#888"
    />
  )
}

export function ShopingCartIcon({ size, color }) {
  return (
    <MaterialIcons
      // style={styles.icon}
      name="shopping-cart"
      size={size}
      color={color}
    />
  )
}

export function DotsIcon(props) {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name="dots-vertical"
      size={16}
      color="#444"
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 15,
    paddingHorizontal: 15
  }
})