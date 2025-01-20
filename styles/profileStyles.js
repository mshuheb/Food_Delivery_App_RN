import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },

  menuButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 8,
  },

  iconContainer: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  icon: {
    marginTop: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    borderRadius: 15,
    padding: 20,
    alignItems: "left",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: 20,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fd5c63",
  },
  genderChangeButton: {
    position: "absolute",
    bottom: -10,
    right: -10,
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "normal",
  },

  detailText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  input: {
    width: 200,
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#fd5c63",
    borderStyle: "solid",
  },

  button: {
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "white",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
