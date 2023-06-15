import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const PictureCard = ({width, item, index, data}) => {
  const currentTime = new Date().getTime();
  const updatedAtTime = new Date(item.updatedAt).getTime();

  const timeDifferenceInMinutes = Math.floor(
    (currentTime - updatedAtTime) / (1000 * 60),
  );

  const timepassed = formatTime(timeDifferenceInMinutes);

  return (
    <View
      style={[
        {
          marginLeft: index === 0 ? (width * 1) / 5 : (width * 1) / 20,
        },
        {
          marginRight:
            index === data.length - 1 ? (width * 1) / 5 : (width * 1) / 20,
        },
      ]}>
      <Image
        source={{
          uri: item?.pictureUrl,
        }}
        style={{width: (width * 3) / 5, height: (width * 3) / 5}}
        className="rounded-3xl "
      />
      <TouchableOpacity className="items-center justify-center flex-row space-x-2 my-2">
        <Image
          source={{
            uri: item?.takerPicture,
          }}
          style={{width: width / 15, height: width / 15}}
          className="rounded-3xl "
        />
        <Text className="font-bold to-black">{item?.takerName}</Text>
        <Text>{timepassed}</Text>
      </TouchableOpacity>
    </View>
  );
};

function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes}m`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  } else if (minutes < 43200) {
    const days = Math.floor(minutes / 1440);
    return `${days}d`;
  } else if (minutes < 525600) {
    const months = Math.floor(minutes / 43200);
    return `${months}mo`;
  } else {
    const years = Math.floor(minutes / 525600);
    const remainingMonths = Math.floor((minutes % 525600) / 43200);
    if (remainingMonths > 0) {
      return `${years}y ${remainingMonths}mo`;
    } else {
      return `${years}y`;
    }
  }
}

export default PictureCard;
