import React from "react";

export class Footer extends React.Component {
  static componentInfo = {
    title: "底部",
    desc: "页面底部"
  };

  render() {
    return (
      <footer
        style={{
          background: "#364d79",
          padding: 15,
          textAlign: "center",
          color: "#fff"
        }}
      >
        <p>&copy; 2017 - {new Date().getFullYear()} SpriteJS Team</p>
      </footer>
    );
  }
}
