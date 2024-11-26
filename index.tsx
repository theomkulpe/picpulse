import React, { useEffect, useState } from "react";
import { View, FlatList, Image } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

type ImageItem = {
  _id: string;
  url: string;
};

const App = () => {
  const [data, setData] = useState<ImageItem[]>([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/images");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: item.url }}
              style={{ width: "100%", aspectRatio: 1 }}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
