import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { theme } from '../constants/theme';

const RichTextEditor = ({ editorRef, onChange }) => {
  // Method to handle image insertion
  const handleInsertImage = () => {
    const imageUrl = 'https://example.com/image.jpg';
    // Wrap URL in an object to ensure correct type (for example, passing src for image)
    const image = { src: imageUrl };
    editorRef.current?.insertImage(image.src); // Pass the image URL to the editor
  };

  // Method to handle video insertion
  const handleInsertVideo = () => {
    const videoUrl = 'https://example.com/video.mp4';
    // Wrap URL in an object if needed, or pass directly depending on your library's requirements
    editorRef.current?.insertVideo(videoUrl); // Pass the video URL to the editor
  };

  return (
    <View style={{ minHeight: 285 }}>
      <RichToolbar
        actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.removeFormat,
            actions.insertVideo,
            actions.checkboxList,
            actions.undo,
            actions.redo,
            actions.heading1,
            actions.heading4,
]}

        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={{ color: tintColor }}>H1</Text>
          ),
          [actions.heading4]: ({ tintColor }) => (
            <Text style={{ color: tintColor }}>H4</Text>
          ),
        }}
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        selectedIconTint={theme.colors.primaryDark}
        editor={editorRef}
        disabled={false}
        onPressAddImage={handleInsertImage} // Handle image insertion
        onPressAddVideo={handleInsertVideo} // Handle video insertion
      />
      <RichEditor
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.contentStyle}
        placeholder={"What's on your mind?"}
        onChange={onChange}
      />
    </View>
  );
};

export default RichTextEditor;

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },
});
