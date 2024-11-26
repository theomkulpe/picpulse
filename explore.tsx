import React, { useState } from "react";
import { View, TextInput, Button, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadScreen = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showImage, setShowImage] = useState<boolean>(false);

  // Function to handle the image upload
  const handleUpload = async () => {
    try {
      const response = await fetch("http://localhost:3000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      if (response.ok) {
        const result = await response.text();
        Alert.alert("Success", result);
      } else {
        Alert.alert("Error", "Failed to upload the image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "An error occurred while uploading the image");
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Enter Image URL"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Show Image" onPress={() => setShowImage(true)} />

      {showImage && imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 200, marginTop: 10 }}
        />
      ) : null}

      <Button
        title="Upload Image"
        onPress={handleUpload}
        style={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default UploadScreen;
