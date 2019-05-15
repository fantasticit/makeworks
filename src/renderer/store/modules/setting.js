const editors = [{ title: "Visual Studio Code", name: "code" }]; // 可用编辑器
const terminals = [
  // 可用终端
  {
    title: "iTerm",
    name: "iTerm"
  },

  {
    title: "Terminal",
    name: "Terminal"
  }
];

const initialState = {
  editors,
  currentEditor: editors[0],
  terminals,
  currentTerminal: terminals[1]
};

export const changeEditor = editor => ({
  type: "CHANGE_EDITOR",
  payload: editor
});

export const changeTerminal = terminal => ({
  type: "CHANGE_TERMINAL",
  payload: terminal
});

export default function(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case "CHANGE_EDITOR":
      return { ...state, currentEditor: payload };

    case "CHANGE_TERMINAL":
      return { ...state, currentTerminal: payload };

    default:
      return state;
  }
}
