import { StyleSheet } from "react-native";

export const CELL_SIZE = 45;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#696969";
export const NOT_EMPTY_CELL_BG_COLOR = "#C71585";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  cell: {
    marginHorizontal: 3,
    height: CELL_SIZE + 10,
    width: CELL_SIZE,
    borderRadius: CELL_BORDER_RADIUS,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  cellText: {
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: "center",
    color: "#FFFFFF",
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    fontSize: 15,
    paddingTop: 30,
    color: "#FFFFFF",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});

export default styles;
