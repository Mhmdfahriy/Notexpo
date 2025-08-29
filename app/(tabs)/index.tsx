import 'react-native-url-polyfill/auto';
import React from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNote } from "../../utils/useNote";

export default function Index() {
  const { note, notes, editingNote, setNote, addOrUpdateNote, deleteNote, editNote } = useNote();

  return (
    <ScrollView style={{ paddingTop: 20, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>NotesKuy</Text>

     
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TextInput
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            flex: 1,
            borderRadius: 8,
          }}
          placeholder="Tulis catatan..."
          value={note}
          onChangeText={setNote}
        />
        <TouchableOpacity
          style={{
            marginLeft: 10,
            backgroundColor: editingNote ? "#5bac25ff" : "#007BFF",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
          onPress={addOrUpdateNote}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {editingNote ? "✔" : "+"}
          </Text>
        </TouchableOpacity>
      </View>

      
      {notes.map((n) => (
        <View
          key={n.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 10,
            backgroundColor: "#f9f9f9",
          }}
        >
          
          <Text style={{ flex: 1, marginRight: 10 }}>{n.content}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#302e28de",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
                marginRight: 5,
              }}
              onPress={() => editNote(n)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#ff3939ff",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() => deleteNote(n.id)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
